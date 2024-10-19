import store from "@/context/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
export default function Layout() {
  return (

      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
   
  );
}
