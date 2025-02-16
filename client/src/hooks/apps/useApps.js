import { useQuery } from "react-query";
import { getAllAppsFromCloud } from "../../api";

const useApps = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "apps",
    async () => await getAllAppsFromCloud(),
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useApps;
