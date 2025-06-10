import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Increment({ count, setCount }: Props) {
  return (
    <Pressable
      onPress={() => setCount(count + 1)}
      style={({ pressed }) => [
        styles.button,
        styles.increment,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>➕ Increment</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  increment: {
    backgroundColor: "lightblue",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
