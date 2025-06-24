import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import FruitList from "../components/FruitList";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const handlePress = () => {
    alert("Lab 1 Done");
  };

  const groupMembers = [
    { name: "Joy Wong", github_repo: "joywong1228", group_no: "3" },
    { name: "Sheeba Hussaini", github_repo: "s-hussaini", group_no: "3" },
    { name: "Ahmad Fakhry", github_repo: "syruphie", group_no: "3" },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Group Members:</Text>
      {groupMembers.map((member, index) => (
        <Text key={index}>{member.name}</Text>
      ))}

      <Pressable onPress={handlePress}>
        <Text style={styles.button}>Press Me</Text>
      </Pressable>
      <FruitList />

      <Pressable
        onPress={() => router.push("/lab3/lab3")}
        style={{ marginVertical: 20 }}
      >
        <Text style={{ fontSize: 18, color: "green" }}>Go to Lab 3</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/lab4")}
        style={{ marginVertical: 10 }}
      >
        <Text style={styles.labButton}>Go to Lab 4: Vacation Destinations</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "lightblue",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },

  labButton: {
    fontSize: 18,
    color: "blue",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});