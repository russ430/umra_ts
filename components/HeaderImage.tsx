import { Image, StyleSheet } from 'react-native';

import { View } from './Themed';
import Phone from '../constants/Layout';

export default function HeaderImage() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/umassmrowing.appspot.com/o/um-oar-maroon-fill-540.png?alt=media&token=c8b84b58-a8dd-41c1-8e4c-c2bf7fd13b0c',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    alignItems: 'center',
  },
  image: {
    width: Phone.window.width * 0.35,
    height: Phone.window.width * 0.35,
  },
});
