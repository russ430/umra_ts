import { Pressable, StyleSheet, GestureResponderEvent } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

interface Props {
  children: string;
  style?: Object;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean | null | undefined;
}

export default function Button(props: Props) {
  const { children, disabled, onPress } = props;
  const colorScheme = useColorScheme();
  return (
    <Pressable
      disabled={disabled}
      style={[styles.container, props.style]}
      onPress={onPress}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: disabled
              ? Colors[colorScheme].buttonDisabledBackgroundColor
              : Colors[colorScheme].buttonBackgroundColor,
          },
        ]}
      >
        <Text
          style={[styles.text, { color: Colors[colorScheme].buttonTextColor }]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 18,
  },
  container: {
    marginVertical: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
