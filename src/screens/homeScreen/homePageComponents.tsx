import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Divider, List, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import {Text} from 'react-native-paper';
import LogoutDialogue from '../../components/logOutDialog';
// import {theme} from '../../theme/theme';
import AppointmentCard from './appointmentCard';
import AppointmentOverView from './appoinmentOverView';
import useResponsiveSize from '../../components/useResponsiveSize';
// import useAuthService from '../../hooks/useAuthServices';
// import {useDispatch} from 'react-redux';
// import {RootState} from '../../redux';
// import {AppointmentStatus} from '../../config/enum';
// import {
//   appointmentListRequested,
//   dashboardDataRequested,
// } from '../../redux/silces/userdata.slice';
// import {doctorId} from '../../redux/redux.constants';
// import {getDashBoardData} from '../../services/appointments/appoinment.services';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {dashboardDataRequested} from '../../redux/silces/userdata.slice';
import {doctorId} from '../../redux/redux.constants';
import {RootState} from '../../redux';

const HomePageComponent = (props: any) => {
  const {setIndex, navigation, index} = props;
  const routes = useRoute();
  //routes);
  // const dispatch = useDispatch();
  const theme = useTheme();
  const [visible, setvisible] = useState<boolean>(false);
  const [showLogout, setshowLogout] = useState<boolean>(false);

  const accessToken = useSelector(
    (state: RootState) => state.auth.userDetails?.accessToken,
  );

  const dispatch = useDispatch();

  const [dashboardData] = useState<any>(null);

  useEffect(() => {
    //accessToken, 'getting token');
    if (index === 0 && accessToken && accessToken?.length > 0) {
      //'calling when index 0');
      dispatch(dashboardDataRequested({doctorid: doctorId, accessToken}));
    }
  }, [index, accessToken]);

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
        <Text style={{alignItems: 'center', fontSize: 20, paddingLeft: '35%'}}>
          Home
        </Text>
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
        <ScrollView>
          <View style={{display: 'flex', gap: 40, marginTop: 20}}>
            {/* Appointment overview section */}

            <View style={styles.section}>
              <Text
                variant="titleMedium"
                style={{color: theme.colors.onSurface, marginBottom: 10}}>
                Appointment Overview
              </Text>
              <AppointmentOverView
                navigation={navigation}
                dashboardData={dashboardData}
              />
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
        </ScrollView>
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
