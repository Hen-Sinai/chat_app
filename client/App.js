import React from "react";
import RootNavigator from "./src/stacks/RootNavigator";
import AuthenticatedUserProvider from "./src/context/AuthenticatedUser/AuthenticatedUserContext";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

// import React from "react";
// import RootNavigator from "./src/stacks/RootNavigator";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const removeUser = async () => {
//   try {
//     await AsyncStorage.removeItem("user");
//     console.log("User removed from storage");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default function App() {
//   // Call the removeUser function here
//   removeUser();
//   return <RootNavigator />;
// }
