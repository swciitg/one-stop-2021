module.exports = function verifyRoles(user, roles) {
    let filtered = user.roles.filter((role) => roles.includes(role));
    return filtered.length > 0 ? true : false;
};
