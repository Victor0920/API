const { Router } = require("express");

const publicMessageRoutes = require("./routes/message");
// const publicMessageRoutes = require("./routes/message");

const router = Router();

router.use(publicMessageRoutes);
// router.use(publicMessageRoutes);

module.exports = router;
