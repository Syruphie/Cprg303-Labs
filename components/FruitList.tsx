import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const fruits = ['apple', 'orange', 'mango'];

export default function FruitList() {
  const router = useRouter();

  return (
    <View>
      {fruits.map((fruit) => (
        <Pressable
          key={fruit}
          onPress={() => router.push(`/${fruit}`)}
          style={{ marginVertical: 10 }}
        >
          <Text style={{ fontSize: 18, color: 'blue' }}>{fruit}</Text>
        </Pressable>
      ))}
    </View>
  );
}
