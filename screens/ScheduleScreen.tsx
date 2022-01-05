import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

import { Text } from '../components/Themed';
import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import { Race } from '../components/types';

export default function ScheduleScreen() {
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
