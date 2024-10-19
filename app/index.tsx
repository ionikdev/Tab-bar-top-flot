import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store/rootReducer";

const Page = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  if (user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
