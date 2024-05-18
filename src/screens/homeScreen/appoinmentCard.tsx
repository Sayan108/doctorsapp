import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, PaperProvider, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
// import { getAppoinmentDetailsRequested } from '../../redux/slices/userdata.slice';
import { theme } from '../../theme/theme';
import UserAvatar from '../../components/userAvataricon';
import { getAppoinmentDetailsRequested } from '../../redux/silces/userdata.slice';

const AppointmentCard = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const appointmentDetails = useSelector(
    (state: RootState) => state.userdata.upcomingAppoinment.data,
  );

  return (
    <PaperProvider theme={theme}>
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
          }}
        >
          <Surface style={[styles.surface, { backgroundColor: theme.colors.primaryContainer }]}>
            <View style={styles.iconContainer}>
              <Icon
                name="account-circle"
                style={{ color: theme.colors.onPrimaryContainer }}
                size={44}
              />
              <View>
                <Text variant="titleMedium">{appointmentDetails.patientName}</Text>
                <Text variant="bodySmall">
                  {appointmentDetails.gender} | Age {appointmentDetails.age}
                </Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Icon
                  name="calendar-blank"
                  style={{ color: theme.colors.onPrimaryContainer }}
                  size={24}
                />
                <Text style={{ color: theme.colors.onPrimaryContainer }}>
                  {appointmentDetails.appoinmentDate}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon
                  name="clock-outline"
                  style={{ color: theme.colors.onPrimaryContainer }}
                  size={24}
                />
                <Text style={{ color: theme.colors.onPrimaryContainer }}>
                  {appointmentDetails.appoinmentTime}
                </Text>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <Icon
                name="map-marker-outline"
                style={{ color: theme.colors.onPrimaryContainer }}
                size={24}
              />
              <Text style={{ color: theme.colors.onPrimaryContainer }}>
                {appointmentDetails.clinicAddress}
              </Text>
            </View>
          </Surface>
        </Pressable>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  surface: {
    height: 180,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    gap: 20,
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
    gap: 24,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppointmentCard;
