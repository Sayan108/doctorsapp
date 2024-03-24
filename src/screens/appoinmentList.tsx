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
import AddAppoinmentButton from '../components/addAppoinmentButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {IAppoinment} from '../redux/redux.constants';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux';
import {getAppoinmentDetailsRequested} from '../redux/silces/userdata.slice';

const AppoinmentList = (props: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector(
    (state: RootState) => state.userdata.appoinmentList,
  );
  const handleOpenPhoneApp = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };
  const handleOpenWhatsApp = (number: string) => {
    Linking.openURL(`whatsapp://send?phone=${number}`);
  };

  const {navigation, setIndex} = props;

  const conditionalFunction = () => {
    setIndex(0);
  };

  return (
    <Layout headerText="All appoinments" navigation={conditionalFunction}>
      <ScrollView>
        {data &&
          data?.map((item: IAppoinment, index: number) => (
            <Pressable
              key={item.appoinmentId}
              onPress={() => {
                dispatch(getAppoinmentDetailsRequested(index));
                navigation.navigate('appoinmentdetails', {
                  id: parseInt(item.appoinmentId),
                });
              }}>
              <View style={styles.card} key={item?.appoinmentId}>
                <View style={styles.textContainer}>
                  <Text style={styles.addressHeader}>{item.doctorName}</Text>
                  <Text style={styles.address}>{item.patientName}</Text>
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
                    <Text style={styles.address}>{item.appoinmentTime}</Text>
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
                    <Text style={styles.address}>{item.appoinmentDate}</Text>
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
      <AddAppoinmentButton navigation={navigation} />
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
export default AppoinmentList;
