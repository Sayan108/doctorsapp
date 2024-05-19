import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  PixelRatio,
} from 'react-native';
import React from 'react';
import Layout from '../components/layOut';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PaperProvider, Text} from 'react-native-paper';
import {IAppointment} from '../redux/redux.constants';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux';
import {getAppointmentDetailsRequested} from '../redux/silces/userdata.slice';
import useResponsiveSize from '../components/useResponsiveSize';
import {theme} from '../theme/theme';

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
    <PaperProvider theme={theme}>
      <Layout headerText="All appointments" navigation={conditionalFunction}>
        <ScrollView>
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
                <View style={styles.card} key={item?.appointmentId}>
                  {/*  patientName, ... other details */}
                  <View style={styles.textContainer}>
                    <Text variant="titleLarge">{item.patientName}</Text>
                    {/* <Text variant="bodyMedium">{item.doctorName}</Text> */}

                    {/* clock section */}
                    <View
                      style={styles.section}>
                      <Icon
                        name="clock-outline"
                        color="black"
                        size={useResponsiveSize(24)}
                      />
                      <Text variant="bodyLarge">{item.appointmentTime}</Text>
                    </View>

                    {/* calender section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                      }}
                      >
                      <Icon
                        name="calendar-blank"
                        color="black"
                        size={useResponsiveSize(24)}
                      />
                      <Text variant="bodyLarge">{item.appointmentDate}</Text>
                    </View>

                    {/* address section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <Icon
                        name="map-marker-outline"
                        color="black"
                        size={useResponsiveSize(24)}
                      />
                      <Text variant="bodyLarge">{item.clinicAddress}</Text>
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
                      color={theme.colors.error}
                      size={useResponsiveSize(32)}
                    />
                    <Icon
                      onPress={() => handleOpenWhatsApp(item.clinicPhone)}
                      name="whatsapp"
                      color={'green'}
                      size={useResponsiveSize(32)}
                    />
                  </View>
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </Layout>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
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
  button: {
    marginTop: 24,
    backgroundColor: colors.primaryColor,
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
