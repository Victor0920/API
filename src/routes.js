const { Router } = require("express");

const publicMessageRoutes = require("./routes/message");
const publicUserRoutes = require("./routes/user");

const router = Router();

router.use(publicMessageRoutes);
router.use(publicUserRoutes);

module.exports = router;
