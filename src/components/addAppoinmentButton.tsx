import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddAppointmentButton = (props: any) => {
  const {navigation} = props;
  return (
    <View style={{position: 'absolute', bottom: 35, right: 35}}>
      <Icon
        size={80}
        name="plus-circle"
        color={colors.primaryColor}
        onPress={() => {
          navigation?.navigate('addappointment');
        }}
      />
    </View>
  );
};

export default AddAppointmentButton;
