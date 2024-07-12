const Messages = require("./messages");

function sendResponse(res, status, data = null, message = null) {
  const response = {
    status,
    data,
    message,
  };

  return res.status(status).json(response);
}

module.exports = {
  sendSuccess: (res, data = null, message = Messages.EntityFetched) =>
    sendResponse(res, 200, data, message),

  sendCreated: (res, data = null, message = Messages.EntityCreated) =>
    sendResponse(res, 201, data, message),

  sendBadRequest: (res, message = Messages.EntityNotAvailable) =>
    sendResponse(res, 400, null, message),

  sendUnauthorized: (res, message = Messages.Unauthorized) =>
    sendResponse(res, 401, null, message),

  sendForbidden: (res, message = Messages.Unauthorized) =>
    sendResponse(res, 403, null, message),

  sendConflict: (res, message = Messages.EntityAlreadyExists) =>
    sendResponse(res, 409, null, message),

  sendValidationError: (res, data = null, message = Messages.BadResponse) =>
    sendResponse(res, 422, data, message),

  sendServerError: (res, message = Messages.InternalServerError) =>
    sendResponse(res, 500, null, message),

  sendCustomResponse: (res, status, data = null, message = null) =>
    sendResponse(res, status, data, message),
};
