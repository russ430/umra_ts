import { StyleSheet } from 'react-native';

import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader>Spring Races</SectionHeader>
      <RaceItem />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
