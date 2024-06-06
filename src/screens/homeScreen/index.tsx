import * as React from 'react';
import {BottomNavigation, TouchableRipple, useTheme} from 'react-native-paper';
import HomePageComponent from './homePageComponents';
import {StyleSheet} from 'react-native';
import {colors} from '../../styles';
import AppointmentList from '../appointment/appoinmentList';
import { useEffect } from 'react';
import { appointmentListRequested } from '../../redux/silces/userdata.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { clinicListRequested } from '../../redux/silces/clinic.slice';

const HomeScreen = ({navigation}: {navigation: any}) => {

  const {userDetails} = useSelector((state: RootState) => state.auth);

  const theme =useTheme();
  const dispatch = useDispatch()

  const params ={doctorId:'0f7b8341-6bd6-4af8-b427-6f6e66ffd354'}
  
  dispatch(clinicListRequested(params));
  

  const [index, setIndex] = React.useState(0);
  const handleIndexChange = (params: number) => {
    setIndex(params);
  };

  const homePageRoute = () => (
    <HomePageComponent setIndex={handleIndexChange} navigation={navigation} />
  );

  const allAppointmentList = () => (
    <AppointmentList navigation={navigation} setIndex={handleIndexChange} />
  );



  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'appointments',
      title: 'Appointments',
      focusedIcon: 'timer-sand-full',
      unfocusedIcon: 'timer-sand-empty',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: homePageRoute,
    appointments: allAppointmentList,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
      //  renderTouchable={customRenderTouchableRipple}
      activeColor={theme.colors.primary}
      activeIndicatorStyle={{shadowColor: 'rgba(245, 71, 73, 0.1)'}}
    />
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: 'red', // Example background color
    // borderTopWidth: 1, // Example border style
    // borderTopColor: 'gray', // Example border color
  },
});

export default HomeScreen;
