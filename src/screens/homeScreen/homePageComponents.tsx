import {View, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, List, Provider, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import {Text} from 'react-native-paper';
import LogoutDialogue from '../../components/logOutDialog';
import {theme} from '../../theme/theme';
import AppointmentCard from './appointmentCard';
import AppointmentOverView from './appoinmentOverView';
import useResponsiveSize from '../../components/useResponsiveSize';
import useAuthService from '../../hooks/useAuthServices';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {AppointmentStatus} from '../../config/enum';
import {appointmentListRequested} from '../../redux/silces/userdata.slice';
import {doctorId} from '../../redux/redux.constants';
import {getDashBoardData} from '../../services/appointments/appoinment.services';

const HomePageComponent = (props: any) => {
  const {setIndex, navigation} = props;
  // const dispatch = useDispatch();
  const theme = useTheme();
  const [visible, setvisible] = useState<boolean>(false);
  const [showLogout, setshowLogout] = useState<boolean>(false);

  const {handleLogOut} = useAuthService();
  const dispatch = useDispatch();
  const appointmentList = useSelector((state: RootState) => {
    return state.userdata.appointmentList;
  });
  const [dashboardData, setdashboardData] = useState<any>(null);
  const getDashBoardDatGetter = async () => {
    try {
      const data = await getDashBoardData();
      setdashboardData(data?.data?.data);
      console.log(data?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(appointmentListRequested({doctorid: doctorId}));
    getDashBoardDatGetter();
    console.log('got data');
  }, [dispatch]);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      {/* appbar */}
      <Appbar.Header>
        <Icon
          name="account-circle-outline"
          size={35}
          color={colors.primaryColor}
          onPress={() => {
            setvisible(!visible);
          }}
        />
      </Appbar.Header>

      {visible ? (
        <View
          style={{
            position: 'absolute',
            top: 60, // Adjust as needed
            left: '10%',
            right: 0,
            backgroundColor: theme.colors.surfaceVariant,
            zIndex: 10, // Ensure the menu is above other elements
            elevation: 400,
            width: '60%',
            borderRadius: 20,
          }}>
          <List.Section>
            <List.Item
              title="My profile"
              titleStyle={{
                color: theme.colors.onSurfaceVariant,
              }}
              left={() => (
                <Icon
                  style={{paddingLeft: 10}}
                  name="account-circle-outline"
                  size={useResponsiveSize(24)}
                  color={theme.colors.onSurfaceVariant}
                />
              )}
              onPress={() => {
                navigation.navigate('myprofile');
                setvisible(!visible);
              }}
            />

            <List.Item
              title="Log out"
              titleStyle={{
                color: theme.colors.onSurfaceVariant, // Text color
              }}
              left={() => (
                <Icon
                  style={{paddingLeft: 10}}
                  name="logout"
                  size={useResponsiveSize(24)}
                  color={theme.colors.onSurfaceVariant}
                />
              )}
              onPress={() => {
                setshowLogout(true);
                setvisible(false);
              }}
            />
          </List.Section>
        </View>
      ) : null}

      {/* appointment Overview, upcoming Appointment */}
      {showLogout ? (
        <LogoutDialogue
          visible={showLogout}
          setVisible={setshowLogout}
          navigation={navigation}
        />
      ) : (
        <View style={{display: 'flex', flex: 1}}>
          {/* Appointment overview section */}
          <View style={styles.section}>
            <Text
              variant="titleMedium"
              style={{color: theme.colors.onSurface, marginBottom: 10}}>
              Appointment overview
            </Text>
            <AppointmentOverView navigation={navigation} dashboardData={dashboardData} />
          </View>

          {/* Upcoming appointment section */}
          <View style={styles.section}>
            {/* Upcoming appointment text and see all button */}
            <View style={styles.header}>
              <Text
                variant="titleMedium"
                style={{color: theme.colors.onSurface, marginBottom: 10}}>
                Latest appointment
              </Text>

              <Text
                variant="labelMedium"
                style={{color: theme.colors.error}}
                onPress={() => setIndex(1)}>
                Show All
              </Text>
            </View>

            <AppointmentCard navigation={navigation} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: 12, // Add padding to the container if needed
    gap: 20,
    // justifyContent:'space-between',
  },
  section: {
    display: 'flex',
    height: 'auto',
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between the text elements
    alignItems: 'center',
    width: '100%',
  },

  menuContainer: {},
});
export default HomePageComponent;
