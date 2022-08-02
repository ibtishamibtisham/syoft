const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  const bearertoken = token.split(" ")[1];

  jwt.verify(bearertoken, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) return res.status(403).send("not applicable");
    req.user = user;
    next();
  });
};
