import { Pressable, StyleSheet } from 'react-native';

import { SafeAreaView, Text } from '../components/Themed';

export default function MoreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
