import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors, style} from '../styles';

interface IhelperTextProps {
  type: 'error' | 'info';
  text: string;
  show: boolean;
}

const HelperText = (props: IhelperTextProps) => {
  const {type, text, show} = props;
  const Style = StyleSheet.create({
    error: {
      color: colors.primaryColor,
      fontSize: 12,
      display: show ? 'flex' : 'none',
    },
    info: {color: colors.primaryColor, fontSize: 12},
  });

  return (
    <View>
      <Text style={Style.error}>{text}</Text>
    </View>
  );
};

export default HelperText;
