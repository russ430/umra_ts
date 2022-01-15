import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebase';

import { setError, setUser, UserData } from '../redux/slices/userSlice';
import HeaderImage from '../components/HeaderImage';
import Button from '../components/Button';
import { SafeAreaView, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function AuthScreen() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [gradYear, onChangeGradYear] = useState('');
  const [name, onChangeName] = useState('');

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const resetInputs = () => {
    onChangeGradYear('');
    onChangePassword('');
    onChangeEmail('');
    onChangeName('');
  };

  const getUserData = (id: string) => {
    const userCollectionRef = doc(db, `users/${id}`);
    getDoc(userCollectionRef).then((docSnapshot) => {
      const userData = {
        ...docSnapshot.data(),
      } as UserData;
      dispatch(setUser(userData));
    });
  };

  const setUserError = (error: { name: string; code: string }) => {
    dispatch(setError(error));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getUserData(userCredential.user.uid);
      })
      .catch((error) => {
        const userError = { name: error.name, code: error.code };
        setUserError(userError);
      });
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const { uid } = userCredential.user;
        const userData: UserData = {
          admin: false,
          email,
          name,
          grad_year: gradYear,
          position: '',
        };
        setDoc(doc(db, 'users', uid), userData)
          .then(() => {
            setUser(userData);
          })
          .catch((error) => {
            const userError = { name: error.name, code: error.code };
            setUserError(userError);
          });
        dispatch(setUser(userData));
      }
    );
    resetInputs();
  };

  const submitButtonHandler = () => {
    if (isLoginForm) {
      login();
    } else {
      signup();
    }
    resetInputs();
  };

  const switchFormTypeHandler = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HeaderImage />
        <Text style={styles.header}>{isLoginForm ? 'Login' : 'Signup'}</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>email</Text>
            <TextInput
              style={[
                { borderColor: Colors[colorScheme].inputBorder },
                styles.input,
              ]}
              onChangeText={onChangeEmail}
              value={email}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>password</Text>
            <TextInput
              style={[
                { borderColor: Colors[colorScheme].inputBorder },
                styles.input,
              ]}
              onChangeText={onChangePassword}
              value={password}
              autoCapitalize="none"
            />
          </View>
          {!isLoginForm ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>name</Text>
                <TextInput
                  style={[
                    { borderColor: Colors[colorScheme].inputBorder },
                    styles.input,
                  ]}
                  onChangeText={onChangeName}
                  value={name}
                  maxLength={4}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>grad year</Text>
                <TextInput
                  style={[
                    { borderColor: Colors[colorScheme].inputBorder },
                    styles.input,
                  ]}
                  onChangeText={onChangeGradYear}
                  value={gradYear}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>
            </>
          ) : null}
          <Button onPress={submitButtonHandler}>submit</Button>
        </View>

        <View>
          <Pressable onPress={switchFormTypeHandler} style={{ marginTop: 12 }}>
            <Text style={styles.centered}>
              {isLoginForm
                ? "Don't have an account yet? Sign up here"
                : 'Already have an accout? Login here.'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginTop: 24,
  },
  header: {
    fontSize: 32,
    marginTop: 36,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  centered: {
    textAlign: 'center',
  },
});
