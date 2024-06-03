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

const HomeScreen = ({navigation}: {navigation: any}) => {

  const {userDetails} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()

  const theme =useTheme();

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

  // useEffect(() => {
    dispatch(appointmentListRequested());
    // dispatch(
    //   doctorDetailsRequested({
    //     doctorId: "e0f64f05-3fa2-4356-b130-3aa30d3237b7",
    //   })
    // );
  // }, []);

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
