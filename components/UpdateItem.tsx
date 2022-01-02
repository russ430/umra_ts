import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Timestamp from './Timestamp';
import { Update } from './types';

interface UpdateProps {
  update: Update;
}

export default function UpdateItem(props: UpdateProps) {
  const {
    update: { author, body, date, position },
  } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.position}>- {position}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <Timestamp date_posted={date} />
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
