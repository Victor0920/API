const { Router } = require("express");

const publicMessageRoutes = require("./routes/message");
const publicUserRoutes = require("./routes/user");
const publicDeviceRoutes = require("./routes/device");

const router = Router();

router.use(publicMessageRoutes);
router.use(publicUserRoutes);
router.use(publicDeviceRoutes);

module.exports = router;
