import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type CompProps = {
  children: string;
};

export default function HomeScreen(props: CompProps) {
  const { children } = props;
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        ...styles.container,
        borderBottomColor: Colors[colorScheme].separator,
      }}
    >
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
