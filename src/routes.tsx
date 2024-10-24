import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import PasswordLoginScreen from './screens/login/PasswordLoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './redux';
import OTPInputScreen from './screens/login/otpScreen';
import HomeScreen from './screens/homeScreen';
import ChooseDateAndTime from './screens/chooseDateandTime';
import MyProfile from './screens/profile/myProfile';
import AppointmentList from './screens/appointment/appoinmentList';
import AppointmentDetails from './screens/appointment/appoinmentDetails';
import PasswordLoginScreen from './screens/login/passwordLogin';
import AddAppointment from './screens/appointment/adddAppoinment';

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
          {/* <Stack.Screen name="phoneinput" component={PasswordLoginScreen} />
          <Stack.Screen name="otpverification" component={OTPInputScreen} /> */}

          <Stack.Screen name="login" component={PasswordLoginScreen} />

          <Stack.Screen
            name="home"
            component={isAuthenticated ? HomeScreen : PasswordLoginScreen}
          />
          <Stack.Screen
            name="appointmentlist"
            component={isAuthenticated ? AppointmentList : PasswordLoginScreen}
          />
<Stack.Screen
            name="addappoinment"
            component={isAuthenticated ? AddAppointment : PasswordLoginScreen}
          />
          <Stack.Screen
            name="reschedule"
            component={isAuthenticated ? ChooseDateAndTime : PasswordLoginScreen}
            initialParams={{id: -1}}
          />

          <Stack.Screen
            name="myprofile"
            component={isAuthenticated ? MyProfile : PasswordLoginScreen}
          />

          <Stack.Screen
            name="appointmentdetails"
            component={isAuthenticated ? AppointmentDetails : PasswordLoginScreen}
            initialParams={{id: -1}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
