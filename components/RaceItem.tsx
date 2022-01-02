import { StyleSheet } from 'react-native';
import { format, parseISO } from 'date-fns';

import { Text, View } from '../components/Themed';
import { Race } from './types';

interface RaceItemProps {
  race: Race;
}

export default function RaceItem(props: RaceItemProps) {
  const {
    race: { race_name, location, start_date },
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{format(parseISO(start_date), 'MMMM do')}</Text>
      <Text style={styles.name}>{race_name}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  date: {
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
