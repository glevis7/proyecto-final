const { Conversation, User, Participant, Message } = require("../../models");

const createConversation = async (req, res, next) => {
  try {
    const { userId, participantId } = req.body;
    // creo la conversación
    const conversation = await Conversation.create({ createdBy: userId });
    // agregar a los participantes a la conversacion --> creandolos en la tabla pivote
    const user = await User.findByPk(userId);
    const participant = await User.findByPk(participantId);
    await conversation.addUser(user);
    await conversation.addUser(participant);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

// poder manipular la tabla pivote
/*
   @participantsIds -> arreglo de ids
*/
const createGroupConversation = async (req, res, next) => {
  try {
    // ? cuantos participantes se van a enviar cuando se crea el grupo
    const { userId, participantsIds, title } = req.body;
    const conversation = await Conversation.create({
      createdBy: userId,
      title,
      type: "group",
    });
    // necesitamos crear a los participantes en la tabla pivote
    // {UserId, ConversationId}
    // agreagar al UserId dentro del arreglo de participantsIds
    const createParticipants = [...participantsIds, userId].map(
      (participant) => ({
        ConversationId: conversation.id,
        UserId: participant,
      })
    );

    await Participant.bulkCreate(createParticipants);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getAllConversations = async (req, res, next) => {
  try {
    const  {id} = req.params;

    const conversations = await Participant.findAll({
      where: { UserId: id },
      include: {
        model: Conversation,
        include: {
          model: Participant,
          attributes: ["UserId"],
          include: {
            model: User,
            attributes: ["firstname", "lastname", "avatar"],
          },
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

const getOneConversation = async (req, res, next) => {
  try {
    const  {id} = req.params;

    const conversation = await Conversation.findByPk(id, { include: [Message, User]});
    if (!conversation) return res.status(404).json({ message: "No conversation found with id "+id})
    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const  {id} = req.params;

    await Conversation.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  createGroupConversation,
  getAllConversations,
  getOneConversation,
  deleteConversation
};