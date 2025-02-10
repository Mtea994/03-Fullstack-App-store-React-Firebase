import { auth } from "../config/firebase.config";

export const signOutUser = async (queryClient) => {
  await auth.signOut();
  console.log("hi");
  queryClient.setQueryData("user", null);
};
