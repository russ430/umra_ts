import { StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

import HeaderImage from '../components/HeaderImage';
import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';
import { Race, Update } from '../components/types';

export default function HomeScreen() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const racesCollectionRef = collection(db, 'races');
  const [updates, setUpdates] = useState<Update[] | null>(null);
  const updatesCollectionRef = collection(db, 'updates');

  useEffect(() => {
    const getupdates = async () => {
      const updateDataRaw = await getDocs(updatesCollectionRef);
      const updateData = updateDataRaw.docs.map((doc) => {
        const { author, body, date, position } = doc.data();
        return {
          author,
          body,
          date,
          position,
          id: doc.id,
        };
      });
      setUpdates(updateData);
    };
    const getRaces = async () => {
      const raceDataRaw = await getDocs(racesCollectionRef);
      const raceData = raceDataRaw.docs.map((doc) => {
        const { boathouse, end_date, location, race_name, start_date } =
          doc.data();
        return {
          boathouse,
          end_date,
          location,
          race_name,
          start_date,
          id: doc.id,
        };
      });
      setRaces(raceData);
    };
    getupdates();
    getRaces();
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
