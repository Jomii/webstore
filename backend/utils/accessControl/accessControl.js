const jwt = require("jsonwebtoken");
const secret = require("../config").jwt_secret;

/* Gets normal middleware parameters (req, res, next)
 * and allowedRoles parameter, which should be an array of
 * roles (strings) that are allowed for this specific route.
 */
exports.accessValidator = (req, res, next, allowedRoles) => {
  // Check authorization headers.
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.sendStatus(401);
    return;
  }

  // Get the token from headers & verify it.
  const token = req.headers.authorization.slice(
    7,
    req.headers.authorization.length
  );
  jwt.verify(token, secret, { algorithm: "HS256" }, (err, decoded) => {
    // Check errors.
    if (err) {
      console.error(`Error verifying JW-token: ${err}`);
      res.sendStatus(500);
      return;
    }

    // Check that the token contains correct role for this route.
    if (!allowedRoles.includes(decoded.role)) {
      res.sendStatus(403);
      return;
    }

    // Everything ok. Grant access to route.
    next();
  });
};
