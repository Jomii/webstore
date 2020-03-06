/* These are example lists of different access tiers. E.g. admin user
 * is in all three lists because admin has access to everything.
 * These should be usd with accessValidator function (see accessControl.js)
 * (and could be copied in the same file tbh).
 */

// Roles that have normal registered user priviledges.
exports.registered = ["admin", "shopkeeper", "registered"];
// Roles that have shopkeeper priviledges.
exports.shopkeeper = ["admin", "shopkeeper"];
// Roles that have admin priviledges.
exports.admin = ["admin"];
