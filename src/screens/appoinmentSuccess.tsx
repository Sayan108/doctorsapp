import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

const AppointmenSuccess = ({navigation}: {navigation: any}) => {
  return (
    <View style={{alignItems: 'center', marginTop: 200}}>
      <Icon name="check-circle" size={150} color={'green'} />
      <Text style={{fontSize: 20, color: 'black'}}>
        Your appointment is booked successfully
      </Text>
      <Button
        onPress={() => {
          navigation.navigate('home');
        }}
        mode="text">
        <Text>Go to home</Text>
      </Button>
    </View>
  );
};

export default AppointmenSuccess;
