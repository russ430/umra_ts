import { StyleSheet } from 'react-native';
import { formatDistance, parseISO } from 'date-fns';

import { Text, View } from './Themed';

interface TimestampProps {
  date_posted: string;
}

export default function Timestamp(props: TimestampProps) {
  const { date_posted } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {formatDistance(Date.now(), new Date(parseISO(date_posted)))} ago
      </Text>
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
