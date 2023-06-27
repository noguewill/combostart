export const getErrorMessage = (error) => {
  if (error === "NotAuthorizedException") {
    return "Incorrect username or password";
  } else if (error === "UserNotConfirmedException") {
    return "Account not confirmed. Please check your email for the confirmation link.";
  } else if (error === "UserNotFoundException") {
    return "User not found. Please check your username.";
  } else if (error === "InvalidPasswordException") {
    return "Invalid password. Please try again.";
  } else if (error === "CodeMismatchException") {
    return "Verification code mismatch. Please enter the correct code.";
  } else if (error === "ExpiredCodeException") {
    return "Verification code expired. Please request a new code.";
  } else if (error === "TooManyFailedAttemptsException") {
    return "Too many failed sign-in attempts. Please try again later.";
  } else {
    return "An error occurred during sign-in.";
  }
};
