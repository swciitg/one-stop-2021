module.exports = function verifyRoles(user, roles) {
    // console.log(user);
    let filtered = user.roles.filter((role) => roles.includes(role));
    return filtered.length > 0 ? true : false;
};
