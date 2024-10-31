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
import {ActivityIndicator, List, RadioButton, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {
  appointmentListRequested,
  getAppointmentDetailsRequested,
} from '../../redux/silces/userdata.slice';
import useResponsiveSize from '../../components/useResponsiveSize';
import {theme} from '../../theme/theme';
import {formatDateString} from '../../util/funtions.util';
import {IAppointment} from '../../redux/constants/appointment.constant';
import {AppointmentStatus, AppointmentStatusText} from '../../config/enum';
import {IClinicDetails} from '../../redux/constants/clinic.constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {doctorId} from '../../redux/redux.constants';
import {EmptyPage} from '../../components/emptyPage';
import AddAppointmentButton from '../../components/addAppoinmentButton';

const AppointmentList = (props: any) => {
  const dispatch = useDispatch();

  const [selectedStatusIndex, setSelectedStatusIndex] = React.useState(0);
  const [selectedClinicIndex, setSelectedClinicIndex] = React.useState(0);

  //payload
  const [payload, setPayload] = useState<{
    doctorId: string;
    clinicId?: string | null;
    status?: number | null;
  }>({doctorId: doctorId, clinicId: null, status: null});

  //api call to get appointment list
  useEffect(() => {
    dispatch(appointmentListRequested(payload));
  }, [payload]);

  //formatting clinic list
  let clinicList: IClinicDetails[] = useSelector(
    (state: RootState) => state.clinicData.ClinicList.data || [],
  );
  const allClinic: IClinicDetails = {
    clinicId: null,
    clinicName: 'All Clinics',
    address: null,
  };
  clinicList = [allClinic, ...clinicList];

  // //'clinicList is here', clinicList);

  //appointment list
  const appointmentList: IAppointment[] = useSelector(
    (state: RootState) => state.userdata.appointmentList.data,
  );

  console.log(appointmentList[0], 'getting appointmentlist');

  //updating upcoming appointment
  // useEffect(() => {
  //   const upcomingAppointmentList =
  //     appointmentList.length > 0
  //       ? appointmentList.filter(item => {
  //           return item.status === AppointmentStatus.Upcoming;
  //         })
  //       : null;
  //   const upcomingAppAppointment = upcomingAppointmentList
  //     ? upcomingAppointmentList.length > 0
  //       ? upcomingAppointmentList[0]
  //       : null
  //     : null;
  //   dispatch(updateUpcomingAppointment(upcomingAppAppointment));
  // }, [appointmentList]);

  //loading state
  const isLoading = useSelector(
    (state: RootState) => state.userdata.appointmentList.loading,
  );

  const handleOpenPhoneApp = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };
  const handleOpenWhatsApp = (number: string) => {
    Linking.openURL(`whatsapp://send?phone=${number}`);
  };

  //filter by clinic list logic
  const handleClinicRadioButtonClick = (
    index: number,
    item: IClinicDetails,
  ) => {
    setSelectedClinicIndex(index);
    setClinicListVisible(false);
    setPayload({...payload, clinicId: item.clinicId});
  };
  const [clinicListVisible, setClinicListVisible] = useState<boolean>(false);

  const [statusListVisible, setStatusListVisible] = useState<boolean>(false);
  const displayStatusList = ['All Status', ...AppointmentStatusText];
  const handleStatusRadioButtonClick = (index: number, item: string) => {
    const {doctorId, clinicId, status} = payload;

    setSelectedStatusIndex(index);
    // //'selectedStatusIndex', selectedStatusIndex);
    setStatusListVisible(false);
    if (index > 0) {
      //as 0 is holded by All status, which is not an actual status
      setPayload({...payload, status: AppointmentStatusText.indexOf(item)});
    } else {
      if (clinicId) setPayload({doctorId, clinicId});
      else setPayload({doctorId});
    }
  };

  const {navigation, setIndex} = props;

  const conditionalFunction = () => {
    navigation.navigate('home');
  };

  return (
    <Layout>
      {/* filter options */}
      <SafeAreaView
        style={{
          display: 'flex',
          gap: 24,
          flexDirection: 'row',
          paddingLeft: 10,
        }}>
        {/* clinic based filter */}
        <TouchableOpacity
          onPress={() => {
            setStatusListVisible(false);
            setClinicListVisible(!clinicListVisible);
          }}>
          <View
            style={[
              styles.filterOptionsContainer,
              {backgroundColor: theme.colors.primary},
            ]}>
            <Text style={{color: theme.colors.onPrimary}}>
              {clinicList[selectedClinicIndex]?.clinicName
                ? clinicList[selectedClinicIndex].clinicName
                : ''}
            </Text>
            <Icon
              name="expand-more"
              color={theme.colors.onPrimary}
              size={useResponsiveSize(20)}
            />
          </View>
        </TouchableOpacity>

        {/* status based filter  */}
        <TouchableOpacity
          onPress={() => {
            setClinicListVisible(false);
            setStatusListVisible(!statusListVisible);
          }}>
          <View
            style={[
              styles.filterOptionsContainer,
              {backgroundColor: theme.colors.primary},
            ]}>
            <Text style={{color: theme.colors.onPrimary}}>
              {displayStatusList[selectedStatusIndex]}
            </Text>
            <Icon
              name="expand-more"
              color={theme.colors.onPrimary}
              size={useResponsiveSize(20)}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {/* clinic list */}
      {clinicListVisible ? (
        <View
          style={[
            styles.filterOptions,
            {
              backgroundColor: theme.colors.surfaceVariant,
              width: '60%',
              left: '10%',
            },
          ]}>
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
                      handleClinicRadioButtonClick(index, item);
                    }}
                    value={index.toString()}
                  />
                )}
              />
            ))}
          </List.Section>
        </View>
      ) : null}

      {/* status list */}
      {statusListVisible ? (
        <View
          style={[
            styles.filterOptions,
            {
              backgroundColor: theme.colors.surfaceVariant,
              width: '60%',
              left: '30%',
            },
          ]}>
          <List.Section>
            {displayStatusList.map((item, index) => (
              <List.Item
                key={index}
                title={item}
                titleStyle={{
                  color: theme.colors.onSurfaceVariant,
                }}
                right={() => (
                  <RadioButton
                    status={
                      index === selectedStatusIndex ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      handleStatusRadioButtonClick(index, item);
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
        <ActivityIndicator
          size="large"
          style={{marginTop: '50%', marginHorizontal: 10}}
        />
      ) : appointmentList.length > 0 ? (
        <View>
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
                          {item.clinicData?.address?.address || ''}
                        </Text>
                      </View>
                    </View>

                    {/* whatsapp and call icon */}
                    {item?.patientData?.phoneNumber && (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 16,
                        }}>
                        <Icon
                          onPress={() =>
                            handleOpenPhoneApp(item?.patientData?.phoneNumber)
                          }
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
                    )}
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      ) : (
        //showing empty page if no appointment found
        <EmptyPage text={'sorry! no appointment found'} />
      )}
      {/* <AddAppointmentButton/> */}
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
  filterOptionsContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    padding: 8,
    gap: 4,
    flexDirection: 'row',
    borderRadius: 12,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  filterOptions: {
    position: 'absolute',
    top: 60, // Adjust as needed
    right: 0,
    zIndex: 10, // Ensure the menu is above other elements
    elevation: 400,
    borderRadius: 20,
  },
});
export default AppointmentList;
