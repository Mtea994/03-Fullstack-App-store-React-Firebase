import { auth } from "../config/firebase.config";
import { BASE_URL } from "../utility/URL";

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
