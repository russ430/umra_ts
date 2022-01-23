import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUpdates } from '../redux/slices/updatesSlice';

export default function UpdatesScreen() {
  const dispatch = useAppDispatch();
  const updates = useAppSelector((state) => state.updates.data);

  useEffect(() => {
    dispatch(getUpdates());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {updates ? (
          updates.map((update) => (
            <UpdateItem key={update.id} update={update} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
