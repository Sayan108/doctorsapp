import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Provider, Surface} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
// import { getAppointmentDetailsRequested } from '../../redux/slices/userdata.slice';
import {theme} from '../../theme/theme';
import UserAvatar from '../../components/userAvataricon';
import {getAppointmentDetailsRequested} from '../../redux/silces/userdata.slice';
import {formatDateString} from '../../util/funtions.util';
import useResponsiveSize from '../../components/useResponsiveSize';
import { IAppointment } from '../../redux/constants/appointment.constant';
import AmbulanceIcon from '../../asset/icons/ambulanceicon';



const AppointmentCard = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const appointmentDetails = useSelector(
    (state: RootState) => state.userdata.upcomingAppointment,
  );
  // const appointmentDetails = '';
  console.log('appointmentDetails',appointmentDetails);

  return (
    <Provider theme={theme}>
      {appointmentDetails ? (
        <Pressable
          onPress={() => {
            // dispatch(
            //   getAppointmentDetailsRequested(
            //     parseInt(appointmentDetails.appointmentId?appointmentDetails.appointmentId:'') - 1,
            //   ),
            // );
            navigation.navigate('appointmentdetails', {
              id: appointmentDetails.appointmentId,
            });
          }}
          >
          <Surface
            style={[
              styles.surface,
              {backgroundColor: theme.colors.surfaceVariant},
            ]}>
            <View style={styles.iconContainer}>
              <Icon
                name="account-circle"
                style={{color: theme.colors.onSurfaceVariant}}
                size={44}
              />
              <View>
                <Text variant="titleMedium">
                  {appointmentDetails.patientData.fullname}
                </Text>
                <Text variant="bodySmall">
                  {appointmentDetails.patientData.gender} | Age {appointmentDetails.patientData.age}
                </Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Icon
                  name="calendar-blank"
                  style={{color: theme.colors.onSurfaceVariant}}
                  size={useResponsiveSize(24)}
                />
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  {formatDateString(appointmentDetails.bookingDate)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon
                  name="clock-outline"
                  style={{color: theme.colors.onSurfaceVariant}}
                  size={useResponsiveSize(24)}
                />
                <Text style={{color: theme.colors.onSurfaceVariant}}>
                  {appointmentDetails.checkupHour}
                </Text>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <Icon
                name="map-marker-outline"
                style={{color: theme.colors.onSurfaceVariant}}
                size={useResponsiveSize(24)}
              />
              <Text style={{color: theme.colors.onSurfaceVariant}}>
                {appointmentDetails.clinicData?.address?.address}
              </Text>
            </View>
          </Surface>
        </Pressable>
      ):(
        <Surface
        style={{display:'flex',justifyContent: 'center',alignItems:'center',paddingTop:16,paddingBottom:16,borderRadius:4}}
        >
         <View style={{display:'flex',justifyContent:'center',width:100,height:100}}>
         <AmbulanceIcon/>
         </View>
          <Text variant="titleMedium">
            No appointment found !
          </Text>
        </Surface>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  surface: {
    height: 172,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppointmentCard;
