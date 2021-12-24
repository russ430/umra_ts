import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

export default function Timestamp() {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>5 minutes ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
