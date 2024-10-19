import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Platform, ScrollView, Text, View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/lib/schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/context/store";
import { login } from "./store";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons"; // For Face ID (iOS)
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Yup schema for form validation
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(compatible && enrolled);
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: Platform.OS === "ios" ? "Authenticate with Face ID" : "Authenticate with fingerprint",
      fallbackLabel: Platform.OS === "ios" ? "Use passcode" : "Use backup password",
    });

    if (result.success) {
      // Simulate an API call for biometric login
      try {
        const storedEmail = getValues("email");
        dispatch(
          login({
            email: storedEmail || "john.doe@example.com",
            id: 0,
            username: "",
          })
        );

        router.push(`/(root)/(tabs)/home`);
      } catch (error) {
        console.error("Biometric login failed:", error);
        Alert.alert("Login failed", "Biometric authentication failed.");
      }
    } else {
      Alert.alert(
        "Authentication failed",
        "Could not authenticate with biometrics."
      );
    }
  };

  const onSignInPress: SubmitHandler<SignInFormData> = async (data) => {
    console.log("Sign In button pressed with data:", data);

    // Simulate an API call for logging in
    try {
      // Here you would normally make an API call
      // Simulating success
      dispatch(
        login({
          email: data.email,
          id: 0,
          username: "",
        })
      );

      router.push(`/(root)/(tabs)/home`);
    } catch (error) {
      console.error("Login failed:", error);
      // Show error to user
      alert("Login failed. Please check your credentials.");
    }
  };

  //   const onSignInPress = async () => {
  //     router.push(`/(root)/(tabs)/home`);
  //     console.log("press");
  //   };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            error={errors.email?.message}
            onChangeText={(value) => setValue("email", value)}
            {...register("email")}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            error={errors.password?.message}
            onChangeText={(value) => setValue("password", value)}
            {...register("password")}
          />

          <View className="flex-row justify-between items-center mt-6">
            <CustomButton
              title="Sign In"
              onPress={handleSubmit(onSignInPress)}
              className=" w-9/12"
            />

            {/* Fingerprint/Face ID Icon Button */}
            {biometricAvailable && (
              <>
                {Platform.OS === "ios" ? (
                  <MaterialCommunityIcons
                    name="face-recognition" // Face ID icon for iOS
                    size={40}
                    className="bg-primary-400"
                    onPress={handleBiometricLogin}
                    style={{ marginLeft: 20 }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="fingerprint" // Fingerprint icon for Android
                    size={60}
                    color="#68d391"
                    onPress={handleBiometricLogin}
                  />
                )}
              </>
            )}
          </View>

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
