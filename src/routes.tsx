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
import {useTheme} from 'react-native-paper';
import {headerText} from './redux/redux.constants';

const Routes = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const homeScreenTab = useSelector(
    (state: RootState) => state.application.homeScreenTab,
  );
  const Stack = createNativeStackNavigator();

  const theme = useTheme();
  //homeScreenTab, 'geting homescreentab');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          // headerShown: false,
          headerStyle: {backgroundColor: theme.colors.surface},
          headerTintColor: theme.colors.onSurface,
          headerTitleAlign: 'center',
        }}>
        <Stack.Group>
          {/* <Stack.Screen name="phoneinput" component={PasswordLoginScreen} />
          <Stack.Screen name="otpverification" component={OTPInputScreen} /> */}

          <Stack.Screen
            name="login"
            component={PasswordLoginScreen}
            options={{headerTitle: 'Login', headerBackVisible: false}}
          />

          <Stack.Screen
            name="home"
            component={isAuthenticated ? HomeScreen : PasswordLoginScreen}
            options={{
              headerTitle: headerText[homeScreenTab],
              headerBackVisible: false,
            }}
            navigationKey={'home'}
          />
          <Stack.Screen
            name="appointmentlist"
            component={isAuthenticated ? AppointmentList : PasswordLoginScreen}
            options={{headerTitle: 'Appointment List'}}
          />
          <Stack.Screen
            name="addappoinment"
            component={isAuthenticated ? AddAppointment : PasswordLoginScreen}
          />
          <Stack.Screen
            name="reschedule"
            component={
              isAuthenticated ? ChooseDateAndTime : PasswordLoginScreen
            }
            initialParams={{id: -1}}
          />

          <Stack.Screen
            name="myprofile"
            component={isAuthenticated ? MyProfile : PasswordLoginScreen}
          />

          <Stack.Screen
            name="appointmentdetails"
            component={
              isAuthenticated ? AppointmentDetails : PasswordLoginScreen
            }
            initialParams={{id: -1}}
            options={{headerTitle: 'Appointment Details'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
