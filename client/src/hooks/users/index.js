import { useQuery } from "react-query";
import { getAuthenticatedUser } from "../../api";
import { toast } from "react-toastify";

export const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userData = await getAuthenticatedUser();
        // if (!userData) {
        //   toast.error("Error Occured");
        //   throw new Error("ERROR OCCURED");
        // }
        // toast.success("WORKING FINE");
        return userData;
      } catch (error) {
        // console.log(error);
        toast.error(error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, isError, refetch };
};

// import { useQuery } from "react-query";
// import { getAuthenticatedUser } from "../../api";
// import { toast } from "react-toastify";
// import { auth } from "../../config/firebase.config";
// import { useEffect } from "react";

// export const useUser = () => {
//   const { data, isLoading, isError, refetch } = useQuery(
//     "user",
//     async () => {
//       try {
//         const userData = await getAuthenticatedUser();
//         return userData;
//       } catch (error) {
//         console.log(error, "ERROR");
//         toast.error(error.message);
//         // throw error;
//       }
//     },
//     {
//       refetchOnWindowFocus: false,
//     }
//   );

//   // Listen for auth state changes and refetch user data
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(() => {
//       refetch();
//     });
//     return () => unsubscribe();
//   }, [refetch]);

//   return { data, isLoading, isError, refetch };
// };
