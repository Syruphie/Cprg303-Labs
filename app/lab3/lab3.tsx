import { View, StyleSheet } from "react-native";
import Counter from "../../components/lab3/Counter";

export default function Lab3() {
  return (
    <View style={styles.container}>
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
