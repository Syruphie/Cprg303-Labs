import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
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
      <Text style={styles.heading}>CPRG 303 – Lab Project</Text>
      <View style={styles.groupSection}>
        <Text style={styles.subheading}>Group 3 Members</Text>
        {groupMembers.map((member, idx) => (
          <Text key={idx} style={styles.member}>
            {member.name}{" "}
            <Text
              style={styles.github}
              onPress={() =>
                Linking.openURL(`https://github.com/${member.github_repo}`)
              }
            >
              ({member.github_repo})
            </Text>
          </Text>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press Me</Text>
      </Pressable>

      <FruitList />

      <View style={styles.linkSection}>
        <Pressable
          onPress={() => router.push("/lab3/lab3")}
          style={styles.routeButton}
        >
          <Text style={styles.routeText}>Go to Lab 3</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/lab4/lab4")}
          style={styles.routeButton}
        >
          <Text style={styles.routeText}>Go to Lab 4</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 18,
    letterSpacing: 1,
  },
  groupSection: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    width: "90%",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4a7c59",
  },
  member: {
    fontSize: 16,
    marginBottom: 5,
    color: "#222",
  },
  github: {
    color: "#007aff",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 16,
    shadowColor: "#4a90e2",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  linkSection: {
    flexDirection: "row",
    gap: 20,
    marginTop: 22,
  },
  routeButton: {
    backgroundColor: "#e6f0fa",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#b2cbe8",
  },
  routeText: {
    color: "#337ab7",
    fontWeight: "600",
    fontSize: 16,
  },
});
