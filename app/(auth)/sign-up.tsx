import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpSchema } from "@/lib/schema";
import { string } from "yup";

// Yup schema for form validation
interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp = () => {
  const [verification, setVerification] = useState({
    state: "default", // default | pending | success
    code: "",
    error: null || "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  // Handle sign-up form submission
  const onSignUpPress: SubmitHandler<SignUpFormData> = async (data) => {
    console.log("Sign Up button pressed with data:", data);
    setVerification({ ...verification, state: "pending" });
  };

  const onPressVerify = () => {
    console.log("Verify code:", verification.code);
    if (verification.code === "12345") {
      setVerification({ ...verification, state: "success" });
    } else {
      setVerification({ ...verification, error: "Invalid verification code" });
    }
  };

  return (

    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute bottom-5 left-0 right-0 text-2xl text-black text-center font-JakartaSemiBold">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Username"
            placeholder="Enter Username"
            icon={icons.person}
            error={errors.username?.message}
            onChangeText={(value) => setValue("username", value)}
            {...register("username")}
          />
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
          <InputField
            label="Password Confirmation"
            placeholder="Re-Enter Password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            error={errors.password_confirmation?.message}
            onChangeText={(value) => setValue("password_confirmation", value)}
            {...register("password_confirmation")}
          />
          <CustomButton
            title="Sign Up"
            onPress={handleSubmit(onSignUpPress)}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text> Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="font-JakartaExtraBold text-2xl mb-2">
            Verification
          </Text>
          <Text className="font-Jakarta mb-5">
            We've sent a verification code to {getValues("email")}.
          </Text>
          <InputField
            label={"Code"}
            icon={icons.lock}
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code) =>
              setVerification({ ...verification, code, error: null || '' })
            }
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Start Riding 🚘"
            bgVariant="secondary"
            onPress={() => router.push(`/(root)/(tabs)/home`)}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
    
  );
};

export default SignUp;
