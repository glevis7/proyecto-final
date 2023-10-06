const { Router } = require("express");
const {
  createConversationMessage,
  getConversationMessages,
} = require("./messages.controllers");
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();

router
  // .get("/conversation/:id", getConversationMessages)
  .post("/:id", authenticate, createConversationMessage)
  .get("/:id", authenticate, getConversationMessages);

module.exports = router;