import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function RaceItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>April 24th</Text>
      <Text style={styles.name}>Donahue Rowing Center</Text>
      <Text style={styles.location}>Worcester, MA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
