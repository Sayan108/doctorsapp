import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  PixelRatio,
} from 'react-native';
import React from 'react';
import Layout from '../../components/layOut';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider, Text} from 'react-native-paper';
import {IAppointment} from '../../redux/redux.constants';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {getAppointmentDetailsRequested} from '../../redux/silces/userdata.slice';
import useResponsiveSize from '../../components/useResponsiveSize';
import {theme} from '../../theme/theme';
import {formatDateString} from '../../util/funtions.util';

const AppointmentList = (props: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector(
    (state: RootState) => state.userdata.appointmentList,
  );
  const handleOpenPhoneApp = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };
  const handleOpenWhatsApp = (number: string) => {
    Linking.openURL(`whatsapp://send?phone=${number}`);
  };

  const {navigation, setIndex} = props;

  const conditionalFunction = () => {
    setIndex !== undefined ? setIndex(0) : navigation.navigate('home');
  };

  return (
    <Layout headerText="All appointments" navigation={conditionalFunction}>
      <ScrollView style={{backgroundColor: theme.colors.surface}}>
        {data &&
          data?.map((item: IAppointment, index: number) => (
            <Pressable
              key={item.appointmentId}
              onPress={() => {
                dispatch(getAppointmentDetailsRequested(index));
                navigation.navigate('appointmentdetails', {
                  id: parseInt(item.appointmentId),
                });
              }}>
              <View
                style={[
                  styles.card,
                  {
                    borderColor: theme.colors.outline,
                    backgroundColor: theme.colors.surface,
                  },
                ]}
                key={item?.appointmentId}>

                {/*  patientName, ... other details */}
                <View style={styles.textContainer}>
                  <Text
                    style={{color: theme.colors.onSurface}}
                    variant="titleMedium">
                    {item.patientName}{' '}
                  </Text>
                  {/* <Text variant="bodyMedium">{item.doctorName}</Text> */}

                  {/* status */}
                  <View
                    style={{
                      backgroundColor: theme.colors.statusUpcoming,
                      padding: 4,
                      borderRadius: 4,
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      style={{color: theme.colors.onStatusUpcoming}}
                      variant="bodySmall">
                      {' '}
                      status: upcoming{' '}
                    </Text>
                  </View>

                    {/* date time section */}
                  <View style={styles.section}>
                    {/* <Icon
                      name="clock-outline"
                      color={theme.colors.onSurface}
                      size={useResponsiveSize(24)}
                    /> */}
                    <Text
                      style={{color: theme.colors.onSurface}}
                      variant="labelMedium">
                      {item.appointmentTime} |{' '}
                      {formatDateString(item.appointmentDate)}
                    </Text>
                  </View>

                  {/* clock section */}
                  {/* <View style={styles.section}>
                    <Icon
                      name="clock-outline"
                      color={theme.colors.onSurface}
                      size={useResponsiveSize(24)}
                    />
                    <Text
                      style={{color: theme.colors.onSurface}}
                      variant="bodyLarge">
                      {item.appointmentTime}
                    </Text>
                  </View> */}

                  {/* calender section */}
                  {/* <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                    }}>
                    <Icon
                      name="calendar-blank"
                      color={theme.colors.onSurface}
                      size={useResponsiveSize(24)}
                    />

                    <Text
                      style={{color: theme.colors.onSurface}}
                      variant="bodyLarge">
                      {formatDateString(item.appointmentDate)}
                    </Text>
                  </View> */}

                  {/* address section */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 6,
                    }}>
                    <Icon
                      name="map-marker-outline"
                      color={theme.colors.onSurface}
                      size={useResponsiveSize(20)}
                    />
                    <Text
                      style={{color: theme.colors.onSurface}}
                      variant="bodyMedium">
                      {item.clinicAddress}
                    </Text>
                  </View>
                </View>

                {/* whatsapp and call icon */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                  }}>
                  <Icon
                    onPress={() => handleOpenPhoneApp(item.clinicPhone)}
                    name="phone"
                    color={theme.colors.onTertiaryContainer}
                    size={useResponsiveSize(24)}
                    style={{
                      // borderWidth: 1,
                      borderRadius: 100,
                      padding: 8,
                      // borderColor: theme.colors.primaryContainer,
                      backgroundColor: theme.colors.tertiaryContainer,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  {/* <Icon
                    onPress={() => handleOpenWhatsApp(item.clinicPhone)}
                    name="whatsapp"
                    color={'green'}
                    size={useResponsiveSize(32)}
                  /> */}
                </View>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  textContainer: {
    display: 'flex',
    gap: 10,
    flex: 1,
    // borderWidth: 1,
  },
  radioButtonContainer: {
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
export default AppointmentList;
