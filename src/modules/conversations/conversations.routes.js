const { Router } = require("express");
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
  getOneConversation,
  deleteConversation,
} = require("./conversations.controllers");
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();

// crear conversaciones
// crear conversaciones grupales
// obtener todas las conversaciones
// obtener una conversacion con todos los mensajes

router.post("/", authenticate, createConversation);
router.post("/group", authenticate, createGroupConversation);

router.get("/user/:id", authenticate, getAllConversations);
router.get('/:id', authenticate, getOneConversation)
router.delete('/:id', deleteConversation);


module.exports = router;