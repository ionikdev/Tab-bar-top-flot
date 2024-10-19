import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { useDispatch } from "react-redux";
import { logout } from "@/app/(auth)/store";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const Profile = () => {
  const dispatch = useDispatch();

  const user = {
    firstName: "John",
    lastName: "Doe",
    primaryEmailAddress: {
      emailAddress: "john.doe@example.com",
    },
    primaryPhoneNumber: {
      phoneNumber: "+1234567890",
    },
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    externalAccounts: [
      {
        imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    ],
  };
  const handleSignOut = () => {
    dispatch(logout());
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={true}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 mt-5 py-3 rounded-lg flex items-center justify-center"
        >
          <Text className="text-white font-JakartaBold text-lg">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
