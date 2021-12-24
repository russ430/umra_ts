import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Timestamp from './Timestamp';

export default function UpdateItem() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.author}>Tony Cronin</Text>
        <Text style={styles.position}>- Head Coach</Text>
        <Text style={styles.body}>
          We're excited to finally launch our mobile app to the masses! Check
          back here often to see what the team is up to and when our next race
          is.
        </Text>
      </View>
      <Timestamp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
});
