const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.roles) {
      res.status(401);
      throw new Error("Unauthorized, role not found");
    }
    const rolesArray = [...allowedRoles];
    // console.log(req.user.roles);
    // console.log(rolesArray);
    const result = req.user.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      res.status(401);
      throw new Error("Unauthorized user, your role does not have role access");
    }
    next();
  };
};
module.exports = verifyRoles;
