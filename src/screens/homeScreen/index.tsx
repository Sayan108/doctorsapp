import * as React from 'react';
import {BottomNavigation, TouchableRipple} from 'react-native-paper';
import HomePageComponent from './homePageComponents';
import {StyleSheet} from 'react-native';
import {colors} from '../../styles';
import AppointmentList from '../appoinmentList';

const HomeScreen = ({navigation}: {navigation: any}) => {
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
  // const customRenderTouchableRipple = (props: any) => {
  //   return (
  //     <TouchableRipple
  //       {...props}
  //       rippleColor="rgba(245, 71, 73, 0.1)" // Change YOUR_RIPPLE_COLOR to your desired color
  //     />
  //   );
  // };

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
      //  renderTouchable={customRenderTouchableRipple}
      activeColor={colors.primaryColor}
      activeIndicatorStyle={{shadowColor: 'rgba(245, 71, 73, 0.1)'}}
    />
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: 'red', // Example background color
    borderTopWidth: 1, // Example border style
    borderTopColor: 'gray', // Example border color
  },
});

export default HomeScreen;
