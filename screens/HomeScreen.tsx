import { StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

import HeaderImage from '../components/HeaderImage';
import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';
import { Race } from '../components/types';

export default function HomeScreen() {
  const [races, setRaces] = useState<Race[] | null>(null);
  const racesCollectionRef = collection(db, 'races');

  useEffect(() => {
    const getRaces = async () => {
      const data = await getDocs(racesCollectionRef);
      const raceData = data.docs.map((doc) => {
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
