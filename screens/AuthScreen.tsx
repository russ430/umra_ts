import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import HeaderImage from '../components/HeaderImage';
import Button from '../components/Button';
import { SafeAreaView, Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function AuthScreen() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const colorScheme = useColorScheme();
  const auth = getAuth();

  const submitButtonHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HeaderImage />
        <Text style={styles.header}>Login</Text>
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
            />
          </View>
          <Button onPress={submitButtonHandler}>submit</Button>
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
    padding: 10,
  },
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
});
