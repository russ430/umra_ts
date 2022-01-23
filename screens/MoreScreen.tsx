import { Pressable, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// COMPONENTS
import { SafeAreaView, Text } from '../components/Themed';

// TYPES
import { RootStackParamList } from '../types';

type MoreScreenProps = NativeStackScreenProps<RootStackParamList, 'Root'>;

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate('Auth');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MoreScreen;
