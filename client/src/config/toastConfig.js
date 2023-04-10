import Toast from "react-native-toast-message";

const handleSuccessMessage = (message) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
    visibilityTime: 2000,
  });
};

const handleServerError = (status) => {
  switch (status) {
    case 400:
      Toast.show({
        type: "error",
        text1: "Bad Request",
        text2: "The request was invalid or could not be understood",
        visibilityTime: 2000,
      });
      break;
    case 401:
      Toast.show({
        type: "error",
        text1: "Unauthorized",
        text2: "Please log in to access this resource",
        visibilityTime: 2000,
      });
      break;
    case 403:
      Toast.show({
        type: "error",
        text1: "Forbidden",
        text2: "You do not have permission to access this resource",
        visibilityTime: 2000,
      });
      break;
    case 404:
      Toast.show({
        type: "error",
        text1: "Not Found",
        text2: "The requested resource could not be found",
        visibilityTime: 2000,
      });
      break;
    case 405:
      Toast.show({
        type: "error",
        text1: "Method Not Allowed",
        text2:
          "The method specified in the request is not allowed for the resource",
        visibilityTime: 2000,
      });
    case 429:
      Toast.show({
        type: "error",
        text1: "Too Many Requests",
        text2: "You have exceeded the rate limit for this resource",
        visibilityTime: 2000,
      });
      break;
      break;
    case 500:
      Toast.show({
        type: "error",
        text1: "Server Error",
        text2: "Something went wrong on the server",
        visibilityTime: 2000,
      });
      break;
    case 503:
      Toast.show({
        type: "error",
        text1: "Service Unavailable",
        text2: "The server is currently unable to handle the request",
        visibilityTime: 2000,
      });
      break;
    default:
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An unknown error occurred",
        visibilityTime: 2000,
      });
  }
};

export { handleSuccessMessage, handleServerError };
