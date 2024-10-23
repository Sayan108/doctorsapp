import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddAppointmentButton = (props: any) => {
 const navigation=useNavigation<any>()
  return (
    <View style={{position: 'absolute', bottom: 35, right: 35, zIndex:100000}}>
      <Icon
        size={80}
        name="plus-circle"
        color={colors.primaryColor}
        onPress={() => {
          console.log("dhfdsf")
          navigation?.navigate('addappoinment');
        }}
      />
    </View>
  );
};

export default AddAppointmentButton;
