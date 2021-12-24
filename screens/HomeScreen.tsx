import { StyleSheet } from 'react-native';
import HeaderImage from '../components/HeaderImage';

import RaceItem from '../components/RaceItem';
import SectionHeader from '../components/SectionHeader';
import { SafeAreaView } from '../components/Themed';
import UpdateItem from '../components/UpdateItem';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderImage />
      <SectionHeader>Next Race</SectionHeader>
      <RaceItem />
      <SectionHeader>Latest Updates</SectionHeader>
      <UpdateItem />
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
