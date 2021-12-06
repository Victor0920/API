const { Router } = require("express");

const dialogflowRoutes = require("./routes/dialogflow");

const router = Router();

router.use(dialogflowRoutes);

module.exports = router;
