import { RootState } from "@/context/store/rootReducer";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";


export default function Home() {
  // Get user data from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>User Info</Text>
        {user ? (
          <>
            <Text style={styles.username}>Username: {user.username}</Text>
            <Text style={styles.email}>Email: {user.email}</Text>
            <Text style={styles.email}>Token: {token}</Text>
          </>
        ) : (
          <Text style={styles.error}>No user data available</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '90%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
