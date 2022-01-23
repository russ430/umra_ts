import { useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppDispatch } from '../redux/hooks';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebase';
import * as EmailValidator from 'email-validator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// REDUX
import { setUser, UserData } from '../redux/slices/userSlice';

// COMPONENTS
import HeaderImage from '../components/HeaderImage';
import Button from '../components/Button';
import { Text, View } from '../components/Themed';

// CONSTANTS
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// TYPES
import { RootStackParamList } from '../types';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, onChangeEmail] = useState('');
  const [isValidEmail, setisValidEmail] = useState(true);
  const [isEmailInUse, setIsEmailInUse] = useState(false);
  const [password, onChangePassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [gradYear, onChangeGradYear] = useState('');
  const [isGradYearValid, setIsGradYearValid] = useState(true);
  const [name, onChangeName] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const resetInputs = () => {
    onChangeGradYear('');
    onChangePassword('');
    onChangeEmail('');
    onChangeName('');
    setIsValidPassword(true);
    setisValidEmail(true);
  };

  const isButtonDisabled = () => {
    if (isLoginForm) {
      return email == '' || password == '' || !isValidEmail || !isValidPassword;
    }
    return (
      email == '' ||
      password == '' ||
      gradYear == '' ||
      name == '' ||
      !isValidEmail ||
      !isValidPassword ||
      !isGradYearValid
    );
  };

  const onChangeEmailHandler = (text: string) => {
    setInvalidCredentials(false);
    const trimmed = text.trim();
    setIsEmailInUse(false);
    if (!EmailValidator.validate(trimmed)) {
      setisValidEmail(false);
    } else {
      setisValidEmail(true);
    }
    onChangeEmail(trimmed);
  };

  const onChangePasswordHandler = (text: string) => {
    setInvalidCredentials(false);
    if (text.length < 6 && !isLoginForm) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
    onChangePassword(text);
  };

  const onChangeGradYearHandler = (text: string) => {
    const year = parseFloat(text);
    if (year < 1900 || year > 2100) {
      setIsGradYearValid(false);
    } else {
      setIsGradYearValid(true);
    }
    onChangeGradYear(text);
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

  const handleLoginErrors = (error: { name: string; code: string }) => {
    setInvalidCredentials(true);
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getUserData(userCredential.user.uid);
        resetInputs();
        navigation.navigate('Root');
      })
      .catch((error) => {
        handleLoginErrors({ name: error.name, code: error.code });
      });
  };

  const handleSignupErrors = (error: { name: string; code: string }) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setIsEmailInUse(true);
        break;
      default:
        return;
    }
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid } = userCredential.user;
        const userData: UserData = {
          admin: false,
          email,
          name,
          grad_year: parseFloat(gradYear),
          position: '',
        };
        setDoc(doc(db, 'users', uid), userData)
          .then(() => {
            setUser(userData);
          })
          .catch((error) => {
            handleSignupErrors({ name: error.name, code: error.code });
          });
        dispatch(setUser(userData));
        resetInputs();
      })
      .catch((error) => {
        handleSignupErrors({ name: error.name, code: error.code });
      });
  };

  const submitButtonHandler = () => {
    if (isLoginForm) {
      login();
    } else {
      signup();
    }
  };

  const switchFormTypeHandler = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <SafeAreaView
      style={[
        styles.outerContainer,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.innerContainer}>
        <HeaderImage />
        <Text style={styles.header}>{isLoginForm ? 'Login' : 'Signup'}</Text>
        <View style={styles.form}>
          <View style={styles.invalidInputContainer}>
            {invalidCredentials ? (
              <Text
                style={[
                  styles.invalidInput,
                  { color: Colors[colorScheme].invalidText },
                ]}
              >
                Invalid email or password
              </Text>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>email</Text>
            <TextInput
              style={[
                { borderColor: Colors[colorScheme].inputBorder },
                styles.input,
              ]}
              onChangeText={(text) => onChangeEmailHandler(text)}
              value={email}
              autoCapitalize="none"
            />
            <View style={styles.invalidInputContainer}>
              {!isValidEmail && !isLoginForm ? (
                <Text
                  style={[
                    styles.invalidInput,
                    { color: Colors[colorScheme].invalidText },
                  ]}
                >
                  Invalid email
                </Text>
              ) : null}
              {isEmailInUse && !isLoginForm ? (
                <Text
                  style={[
                    styles.invalidInput,
                    { color: Colors[colorScheme].invalidText },
                  ]}
                >
                  Email already in use
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>password</Text>
            <TextInput
              style={[
                { borderColor: Colors[colorScheme].inputBorder },
                styles.input,
              ]}
              onChangeText={(text) => onChangePasswordHandler(text)}
              value={password}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <View style={styles.invalidInputContainer}>
              {!isValidPassword && !isLoginForm ? (
                <Text
                  style={[
                    styles.invalidInput,
                    { color: Colors[colorScheme].invalidText },
                  ]}
                >
                  Password must be greater than 6 characters
                </Text>
              ) : null}
            </View>
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
                  onChangeText={(text) => onChangeGradYearHandler(text)}
                  value={gradYear}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  maxLength={4}
                />
                <View style={styles.invalidInputContainer}>
                  {!isGradYearValid ? (
                    <Text
                      style={[
                        styles.invalidInput,
                        { color: Colors[colorScheme].invalidText },
                      ]}
                    >
                      Invalid grad year
                    </Text>
                  ) : null}
                </View>
              </View>
            </>
          ) : null}
          <Button disabled={isButtonDisabled()} onPress={submitButtonHandler}>
            submit
          </Button>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: 16,
    paddingBottom: 48,
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
  invalidInput: {
    fontWeight: 'bold',
  },
  invalidInputContainer: {
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  centered: {
    textAlign: 'center',
  },
});

export default AuthScreen;
