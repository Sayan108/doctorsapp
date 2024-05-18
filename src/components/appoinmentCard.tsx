import {View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';

import {colors} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {getAppoinmentDetailsRequested} from '../redux/silces/userdata.slice';
import {PaperProvider, Surface, useTheme} from 'react-native-paper';
import {theme} from '../theme/theme';
import UserAvatar from './userAvataricon';

const AppointmentCard = ({navigation}: {navigation: any}) => {
  // const theme = useTheme();

  const dispatch = useDispatch();
  const appointmentDetails = useSelector(
    (state: RootState) => state.userdata.upcomingAppoinment.data,
  );

  return (
    <PaperProvider theme={theme}>
      <>
        {appointmentDetails && (
          <Pressable
            onPress={() => {
              dispatch(
                getAppoinmentDetailsRequested(
                  parseInt(appointmentDetails.appoinmentId) - 1,
                ),
              );
              navigation.navigate('appoinmentdetails', {
                id: appointmentDetails.appoinmentId,
              });
            }}>
            {/* upcomingAppointment surface */}
            <Surface
              style={{
                height: 192,
                backgroundColor: theme.colors.surface,
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
                paddingBottom:16,
                paddingTop:16,
                borderRadius: 10,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                // gap: 16,
              }}>
              {/* icon, patient name  */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16,
                }}>
                <Icon
                  name="account-circle"
                  color="black"
                  style={{color: theme.colors.primary}}
                  size={44}
                />

                <Text variant="titleMedium" style={{}}>
                  {appointmentDetails.patientName}
                </Text>
              </View>

              {/* date and time */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 24,
                }}>
                {/* date icon and text */}
                <View
                  style={{
                    height: 'auto',
                    width: 'auto',
                    padding: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 20,
                    backgroundColor: theme.colors.primary,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                  {/* date icon */}
                  <Icon
                    name="calendar-blank"
                    style={{
                      color: theme.colors.onPrimary,
                    }}
                    size={24}
                  />

                  {/* date text */}
                  <Text
                    style={{
                      color: theme.colors.onPrimary,
                    }}>
                    {appointmentDetails.appoinmentDate}
                  </Text>
                </View>

                {/* clock icon and text */}
                <View
                  style={{
                    height: 'auto',
                    width: 'auto',
                    padding: 4,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 20,
                    backgroundColor: theme.colors.primary,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                  {/* clock icon */}
                  <Icon
                    name="clock-outline"
                    style={{
                      color: theme.colors.onPrimary,
                    }}
                    size={24}
                  />

                  {/* clock text */}
                  <Text
                    style={{
                      color: theme.colors.onPrimary,
                    }}>
                    {appointmentDetails.appoinmentTime}
                  </Text>
                </View>
              </View>

              {/* address */}
              <View
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderRadius: 20,
                  padding: 4,
                  paddingLeft: 8,
                  paddingRight: 8,
                  backgroundColor: theme.colors.primary,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

                  {/* address icon */}
                <Icon
                  name="map-marker-outline"
                  color="black"
                  style={{
                    color: theme.colors.onPrimary,
                  }}
                  size={24}
                />

                {/* address text */}
                <Text
                   style={{
                    color: theme.colors.onPrimary,
                  }}>
                  {appointmentDetails.clinicAddress}
                </Text>
                
              </View>
            </Surface>
          </Pressable>
        )}
      </>
    </PaperProvider>
  );
};

export default AppointmentCard;
