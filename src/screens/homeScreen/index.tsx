import * as React from 'react';
import {BottomNavigation, useTheme} from 'react-native-paper';
import HomePageComponent from './homePageComponents';
import {StyleSheet} from 'react-native';
import AppointmentList from '../appointment/appoinmentList';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
// import {clinicListRequested} from '../../redux/silces/clinic.slice';
import {ClinicList} from '../clinic/clinicList';
// import { defaultDoctorId } from '../../services/constants';
import {dashboardDataRequested} from '../../redux/silces/userdata.slice';
import {doctorId} from '../../redux/redux.constants';

const HomeScreen = ({navigation}: {navigation: any}) => {
  // const {userDetails} = useSelector((state: RootState) => state.auth);
  const theme = useTheme();
  const dispatch = useDispatch();

  // The dependency array ensures this effect runs once after the initial render

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
  const allClinicList = () => <ClinicList />;

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
    {
      key: 'clinics',
      title: 'Clinics',
      focusedIcon: 'microwave',
      unfocusedIcon: 'microwave',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: homePageRoute,
    appointments: allAppointmentList,
    clinics: allClinicList,
  });
  useEffect(() => {
    if (index === 0) dispatch(dashboardDataRequested(doctorId));
  }, [index]);
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
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
