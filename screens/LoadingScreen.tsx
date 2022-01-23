import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// REDUX
import { UserData } from '../redux/slices/userSlice';
import { setUser } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';

// COMPONENTS
import { SafeAreaView } from '../components/Themed';

// TYPES
import { RootStackParamList } from '../types';

type LoadingScreenProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        getUserData(userCredential.uid);
        navigation.navigate('Root');
      } else {
        navigation.navigate('Auth');
      }
    });
  }, []);

  const getUserData = (id: string) => {
    const userCollectionRef = doc(db, `users/${id}`);
    getDoc(userCollectionRef).then((docSnapshot) => {
      const userData = {
        ...docSnapshot.data(),
      } as UserData;
      dispatch(setUser(userData));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingScreen;
