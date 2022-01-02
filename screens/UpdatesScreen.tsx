import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';
import { Update } from '../components/types';

export default function UpdatesScreen() {
  const [updates, setUpdates] = useState<Update[] | null>(null);
  const updatesCollectionRef = collection(db, 'updates');

  useEffect(() => {
    const getupdates = async () => {
      const data = await getDocs(updatesCollectionRef);
      const updateData = data.docs.map((doc) => {
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
    getupdates();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {updates
        ? updates.map((update) => (
            <UpdateItem key={update.id} update={update} />
          ))
        : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
