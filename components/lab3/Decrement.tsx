import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Decrement({ count, setCount }: Props) {
  return (
    <Pressable
      onPress={() => setCount(count - 1)}
      style={({ pressed }) => [
        styles.button,
        styles.decrement,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>➖ Decrement</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  decrement: {
    backgroundColor: "lightcoral",
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
