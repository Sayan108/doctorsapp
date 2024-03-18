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
import ClinicLocation from './screens/clinicLocation';
import BookingDetails from './screens/bookingDetails';
import AppoinmentList from './screens/appoinmentList';
import AppointmenSuccess from './screens/appoinmentSuccess';
import MyProfile from './screens/myProfile';
import AboutDoctor from './screens/aboutDoctor';
import AppoinmentDetails from './screens/appoinmentDetails';
import Payment from './screens/paymentScreent';

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
            name="addappoinment"
            component={isAuthenticated ? AddAppoinment : PhoneInputScreen}
          />
          <Stack.Screen
            name="choosedateandtime"
            component={isAuthenticated ? ChooseDateandTime : PhoneInputScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="chooseclinic"
            component={isAuthenticated ? ClinicLocation : PhoneInputScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="makepayment"
            component={isAuthenticated ? Payment : PhoneInputScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="bookingdetails"
            component={isAuthenticated ? BookingDetails : PhoneInputScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="appoinmentsuccess"
            component={isAuthenticated ? AppointmenSuccess : PhoneInputScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="myprofile"
            component={isAuthenticated ? MyProfile : PhoneInputScreen}
          />
          <Stack.Screen
            name="aboutdoctor"
            component={isAuthenticated ? AboutDoctor : PhoneInputScreen}
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
