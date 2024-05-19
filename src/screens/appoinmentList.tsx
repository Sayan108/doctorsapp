import {
  View,
  Text,
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

import {IAppointment} from '../redux/redux.constants';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux';
import {getAppointmentDetailsRequested} from '../redux/silces/userdata.slice';

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
                <View style={styles.textContainer}>
                  <Text style={styles.addressHeader}>{item.patientName}</Text>
                  <Text style={styles.address}>{item.doctorName}</Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingTop: 10,
                    }}>
                    <Icon
                      name="clock-outline"
                      color="black"
                      style={{
                        color: 'black',
                        justifyContent: 'space-between',
                        marginRight: 5,
                      }}
                      size={PixelRatio.getPixelSizeForLayoutSize(15)}
                    />
                    <Text style={styles.address}>{item.appointmentTime}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingTop: 10,
                    }}>
                    <Icon
                      name="calendar-blank"
                      color="black"
                      style={{
                        color: 'black',
                        justifyContent: 'space-between',

                        marginRight: 5,
                      }}
                      size={PixelRatio.getPixelSizeForLayoutSize(15)}
                    />
                    <Text style={styles.address}>{item.appointmentDate}</Text>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingTop: 10,
                    }}>
                    <Icon
                      name="map-marker-outline"
                      color="black"
                      style={{
                        color: 'black',
                        justifyContent: 'space-between',
                      }}
                      size={PixelRatio.getPixelSizeForLayoutSize(15)}
                    />
                    <Text style={styles.address}>{item.clinicAddress}</Text>
                  </View>
                </View>

                <Icon
                  onPress={() => handleOpenPhoneApp(item.clinicPhone)}
                  name="phone"
                  color={colors.primaryColor}
                  size={PixelRatio.getPixelSizeForLayoutSize(15)}
                  style={{marginRight: 20}}
                />
                <Icon
                  onPress={() => handleOpenWhatsApp(item.clinicPhone)}
                  name="whatsapp"
                  color={'green'}
                  size={PixelRatio.getPixelSizeForLayoutSize(15)}
                />
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
    borderBottomColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    color: '#333',
    justifyContent: 'space-between',
  },
  addressHeader: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
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
});
export default AppointmentList;
