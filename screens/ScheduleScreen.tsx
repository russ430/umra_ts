import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { Text } from '../components/Themed';
import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import { getRaces } from '../redux/slices/scheduleSlice';

export default function ScheduleScreen() {
  const dispatch = useAppDispatch();
  const races = useAppSelector((state) => state.schedule.races);

  useEffect(() => {
    dispatch(getRaces());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader>Spring Races</SectionHeader>
      {races ? (
        races.map((race) => <RaceItem key={race.id} race={race} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
