const messageService = require("../services/message.service");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const sendMessage = async (req, res) => {
  const { broadcastId } = req.params;
  req.body.createdBy = req.user.userId;
  req.body.broadcast = broadcastId;

  const message = await messageService.sendMessage(req.body);

  if (!message) {
    throw new CustomError.BadRequestError("Message not sent");
  }

  res.status(StatusCodes.CREATED).json({
    sucess: true,
    message: "Message sent successfully",
    data: message,
  });
};

const getMessages = async (req, res) => {
  const { broadcastId } = req.params;
  const { type, page, limit, sort } = req.query;

  const result = await messageService.getMessages(broadcastId, {
    type,
    page: parseInt(page),
    limit: parseInt(limit),
    sort
  });

  res.status(StatusCodes.OK).json(result);
};

const getMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const message = await messageService.getMessage(messageId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Message retrieved successfully",
    data: message
  });
};

const updateMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const message = await messageService.updateMessage(messageId, req.body);

  if (!message) {
    throw new CustomError.NotFoundError(`No message with id: ${messageId}`);
  }

  res.status(StatusCodes.OK).json({ message });
};

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const message = await messageService.deleteMessage(messageId);

  if (!message) {
    throw new CustomError.NotFoundError(`No message with id: ${messageId}`);
  }

  res.status(StatusCodes.OK).json({ message: "Message deleted successfully" });
};

module.exports = {
  sendMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
};
