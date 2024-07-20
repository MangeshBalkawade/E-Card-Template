const Messages = {
  // Server Issue Messages
  InternalServerError: "Something went wrong.",
  CatchErrorMessage: "Access denied, Please contact administrator.",
  TokenNotGenerated: "Token not generated.",

  // Entities Success Messages
  EntityNotAvailable: "Access Denied: Please contact your administrator.", //"No data is associated with the given ID",
  FormValidationError: "Validation error.", //"No data is associated with the given ID",
  EntityCreated: "Data saved successfully.",
  EntityDeleted: "Data deleted successfully.",
  EntityUpdated: "Data updated successfully.",
  EntityFetched: "Data fetched successfully.",

  InvalidCredentials: "Invalid email or password.",
  LoginSuccessful: "User login successful.",

  // Entities Error Messages
  EntityExists: "Access Denied: Please contact your administrator.", //"An entity is already associated with the given ID",
  UnableToSaveEntity: "Unable to save data.",
  UnableToGetEntity: "Unable to fetch data.",
  UnableToUpdateEntity: "Unable to update data.",
  UnableToDeleteEntity: "Unable to delete data.",
  UnableToGetEntityById: "Unable to get data by ID.",
  EntityAlreadyExists: "Data already exist for given credentials",

  BadResponse:
    "Provide valid values or you are not allowed to use the given values.",
  EmailExists: "Email already exist",
  UserNotExists: "User does not exist, please register first",
  SendOtpSuccess: "Otp sent successfully",
  ResendOtpFailed: "Resend OTP not allowed, please initiate the send OTP first",
  InvalidOtp: "Invalid Otp",
  OtpVerify: "OTP verifies successfully.",
  OtpAlreadyVerify: "OTP already verify.",

  emailSubjects: {
    OtpSendEmailSubject: "Your Otp For E-Business Login or Registration",
    OtpResendEmailSubject: "Your Otp For E-Business Login or Registration",
    OtpSendEmailSubjectForDeletion: "Your Otp For E-Business Account Deletion",
  },

  Unauthorized: "You are not allowed to access this module",
  UrlNotExist: "The URL you entered is wrong. Please provide a valid URL.",
};

module.exports = Messages;
