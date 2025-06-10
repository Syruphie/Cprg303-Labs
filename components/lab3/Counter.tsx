import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Increment from "./Increment";
import Decrement from "./Decrement";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.countText}>{count}</Text>
      <Increment count={count} setCount={setCount} />
      <Decrement count={count} setCount={setCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  countText: {
    fontSize: 26,
    marginVertical: 10,
  },
});
