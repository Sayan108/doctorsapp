import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/layOut';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ActivityIndicator,
  Chip,
  List,
  ProgressBar,
  Provider,
  RadioButton,
  Text,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {appointmentListRequested, getAppointmentDetailsRequested} from '../../redux/silces/userdata.slice';
import useResponsiveSize from '../../components/useResponsiveSize';
import {theme} from '../../theme/theme';
import {formatDateString} from '../../util/funtions.util';
import {
  IAppointment,
  IAppointmentList,
} from '../../redux/constants/appointment.constant';
import {AppointmentStatus, AppointmentStatusText} from '../../config/enum';
import { IClinicDetails } from '../../redux/constants/clinic.constant';

const AppointmentList = (props: any) => {

  const [progress, setProgress] = React.useState<number>(0.3);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appointmentListRequested());
  }, []);

  const clinicList:IClinicDetails[] = useSelector((state:RootState)=>state.clinicData.ClinicList.data||[])
  console.log('clinicList is here',clinicList);

  const isLoading = useSelector(
    (state: RootState) => state.userdata.appointmentList.loading,
  );

  const appointmentList: IAppointment[] = useSelector(
    (state: RootState) => state.userdata.appointmentList.data,
  );

  const handleOpenPhoneApp = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };
  const handleOpenWhatsApp = (number: string) => {
    Linking.openURL(`whatsapp://send?phone=${number}`);
  };

  const [selectedClinicIndex, setSelectedClinicIndex] = React.useState(0);
  const handleRadioButtonClick = (index: number, item: any) => {
    setSelectedClinicIndex(index);
    setClinicListVisible(false);
  };

  const [clinicListVisible, setClinicListVisible] = useState<boolean>(false);

  const {navigation, setIndex} = props;

  const conditionalFunction = () => {
    setIndex !== undefined ? setIndex(0) : navigation.navigate('home');
  };

  return (
    <Layout headerText="All appointments" navigation={conditionalFunction}>
      <TouchableOpacity
        onPress={() => {
          setClinicListVisible(true);
        }}>
        <View
          style={{
            display: 'flex',
            backgroundColor: theme.colors.primary,
            alignSelf: 'flex-start',
            padding: 8,
            gap: 4,
            flexDirection: 'row',
            borderRadius: 12,
            minWidth: 80,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: theme.colors.onPrimary}}>
            {clinicList[selectedClinicIndex]?.clinicName?clinicList[selectedClinicIndex].clinicName:""}
          </Text>
          <Icon
            name="expand-more"
            color={theme.colors.onPrimary}
            size={useResponsiveSize(20)}
          />
        </View>
      </TouchableOpacity>

      {/* clinic list */}
      {clinicListVisible ? (
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
            {clinicList.map((item, index) => (
              <List.Item
                key={clinicList.indexOf(item)}
                title={item.clinicName}
                titleStyle={{
                  color: theme.colors.onSurfaceVariant,
                }}
                right={() => (
                  <RadioButton
                    status={
                      index === selectedClinicIndex ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      handleRadioButtonClick(index, item);
                    }}
                    value={index.toString()}
                  />
                )}
              />
            ))}
          </List.Section>
        </View>
      ) : null}


      {isLoading ? (
        <ActivityIndicator  size="large"  style={{marginTop:'50%',marginHorizontal:10}}/>
      ) : (
        <ScrollView style={{backgroundColor: theme.colors.surface}}>
          {appointmentList &&
            appointmentList?.map((item: IAppointment, index: number) => (
              <Pressable
                key={item.appointmentId}
                onPress={() => {
                  dispatch(
                    getAppointmentDetailsRequested(item.appointmentId || ''),
                  );
                  navigation.navigate('appointmentdetails');
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
                      {item.patientData?.fullname}{' '}
                    </Text>
                    {/* <Text variant="bodyMedium">{item.doctorName}</Text> */}

                    {/* status */}
                    <View
                      style={{
                        backgroundColor:
                          item.status === AppointmentStatus.Upcoming
                            ? theme.colors.statusUpcoming
                            : item.status === AppointmentStatus.Completed
                            ? theme.colors.success
                            : item.status === AppointmentStatus.Cancelled
                            ? theme.colors.error
                            : 'transparent',
                        padding: 4,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color:
                            item.status === AppointmentStatus.Upcoming
                              ? theme.colors.onStatusUpcoming
                              : item.status === AppointmentStatus.Completed
                              ? theme.colors.onSuccess
                              : item.status === AppointmentStatus.Cancelled
                              ? theme.colors.onError
                              : 'transparent',
                        }}
                        variant="bodySmall">
                        {' '}
                        {AppointmentStatusText[item.status]}{' '}
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
                        {item.checkupHour} |{' '}
                        {formatDateString(item.bookingDate)}
                      </Text>
                    </View>

                    {/* address section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 6,
                      }}>
                      <Icon
                        name="location-on"
                        color={theme.colors.onSurface}
                        size={useResponsiveSize(20)}
                      />
                      <Text
                        style={{color: theme.colors.onSurface}}
                        variant="bodyMedium">
                        {item.clinicData?.address.address}
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
                      onPress={() => handleOpenPhoneApp('9098675568')}
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
      )}
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
