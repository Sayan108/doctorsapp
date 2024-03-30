import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PhoneInputScreen from './screens/phoneInputScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './redux';
import OTPInputScreen from './screens/otpScreen';
import HomeScreen from './screens/homeScreen';
import AddAppoinment from './screens/adddAppoinment';
import ChooseDateandTime from './screens/chooseDateandTime';

import AppoinmentList from './screens/appoinmentList';

import MyProfile from './screens/myProfile';

import AppoinmentDetails from './screens/appoinmentDetails';

const Routes = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="phoneinput" component={PhoneInputScreen} />
          <Stack.Screen name="otpverification" component={OTPInputScreen} />
          <Stack.Screen
            name="home"
            component={isAuthenticated ? HomeScreen : PhoneInputScreen}
          />
          <Stack.Screen
            name="appoinmentlist"
            component={isAuthenticated ? AppoinmentList : PhoneInputScreen}
          />

          <Stack.Screen
            name="reschedule"
            component={isAuthenticated ? ChooseDateandTime : PhoneInputScreen}
            initialParams={{id: -1}}
          />

          <Stack.Screen
            name="myprofile"
            component={isAuthenticated ? MyProfile : PhoneInputScreen}
          />

          <Stack.Screen
            name="appoinmentdetails"
            component={isAuthenticated ? AppoinmentDetails : PhoneInputScreen}
            initialParams={{id: -1}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
