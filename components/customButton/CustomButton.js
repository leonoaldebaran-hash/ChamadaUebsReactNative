import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Styles from './Style'

function CustomButton({ title, onPress, style, variante = 'primario' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Styles.button, Styles[variante], style]}
    >
      <Text style={[Styles.buttonText, Styles[variante + 'Texto']]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
