import { auth } from "../config/firebase.config";
import { BASE_URL } from "../utility/URL";
import { toast } from "react-toastify";

// export const getAuthenticatedUser = () => {
//   // let userData;
//   auth.onAuthStateChanged(async (userCred) => {
//     if (userCred) {
//       userCred.getIdToken().then((token) => {
//         console.log(token, "TOKEN");
//         return token;
//       });
//     }
//   });
// };

// export const getAuthenticatedUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       unsubscribe(); // Remove listener after first auth state is known
//       if (!user) {
//         reject(new Error("Nework Response was not ok"));
//         return;
//       }
//       try {
//         const token = await user.getIdToken();
//         if (token) {
//           const response = await fetch(BASE_URL + "validateUserJWTToken", {
//             method: "GET",
//             headers: {
//               Authorization: "Bearer " + `${token}`,
//               "Content-Type": "application/json",
//             },
//           });

//           if (!response.ok) {
//             console.log("hey 1");
//             reject(
//               new Error("Nework Response was not ok: " + response.statusText)
//             );
//           }

//           const res = await response.json();
//           const user = res.user;
//           resolve(user);
//         }
//       } catch (error) {
//         console.error("Error getting token:", error);
//         resolve(null);
//       }
//     });
//   });
// };

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const response = await fetch(`${BASE_URL}/validateUserJWTToken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          reject(
            new Error("Network response was not ok: " + response.statusText)
          );
        }
        const resData = await response.json();
        resolve(resData.user);
      } else {
        reject(new Error("User is not Authenticated"));
      }
      unsubscribe();
    });
  });
};

// export const getAuthenticatedUser = async () => {
//   const user = auth.currentUser;
//   if (user) {
//     const token = await user.getIdToken();
//     const response = await fetch(`${BASE_URL}/validateUserJWTToken`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok: " + response.statusText);
//     }
//     const resData = await response.json();
//     return resData.user;
//   } else {
//     throw new Error("User is not Authenticated");
//   }
// };

export const saveAppDataToCloud = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/createNewApp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};
export const updateUserData = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/updateUserData`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

export const getAllAppsFromCloud = async () => {
  try {
    const res = await fetch(`${BASE_URL}/getAllApps`);
    if (!res.ok) {
      toast.error("Failed to load apps");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};

export const getAllUsersFromCloud = async () => {
  try {
    const res = await fetch(`${BASE_URL}/getAllUsers`);
    if (!res.ok) {
      toast.error("Failed to load Users");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error: ${error}`);
  }
};
