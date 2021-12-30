import { StyleSheet } from 'react-native';

import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';

export default function UpdatesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UpdateItem />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
