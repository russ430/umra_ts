import { StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';

import HeaderImage from '../components/HeaderImage';
import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUpdates } from '../redux/slices/updatesSlice';
import { getRaces } from '../redux/slices/scheduleSlice';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const races = useAppSelector((state) => state.schedule.races);
  const updates = useAppSelector((state) => state.updates.data);

  useEffect(() => {
    dispatch(getUpdates());
    dispatch(getRaces());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />
      <SectionHeader>Next Race</SectionHeader>
      {races ? (
        races.slice(0, 1).map((race) => <RaceItem key={race.id} race={race} />)
      ) : (
        <Text>Loading...</Text>
      )}
      <SectionHeader>Latest Updates</SectionHeader>
      {updates
        ? updates
            .slice(0, 3)
            .map((update) => <UpdateItem key={update.id} update={update} />)
        : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
