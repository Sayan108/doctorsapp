import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Button} from 'react-native-paper';

import ChipsGrid from '../components/gridRadioButtons';
import {colors} from '../styles';
import Layout from '../components/layOut';
import {RootState} from '../redux';
import {
  dateTimeSlotRequested,
  updateAppointmentRequested,
} from '../redux/silces/userdata.slice';
import {parseDateString} from '../util/funtions.util';

const ChooseDateandTime = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const dateSlots = useSelector((state: RootState) => state.userdata.dateSlots);
  const timeSlots = useSelector((state: RootState) => state.userdata.timeSlots);
  const clinicid = useSelector(
    (state: RootState) =>
      state.userdata.currentAppointmentDetails.data?.clinicId,
  );
  const appoinmentId = useSelector(
    (state: RootState) =>
      state.userdata.currentAppointmentDetails.data?.appointmentId,
  );
  const loading = useSelector(
    (state: RootState) => state.userdata.dateTimeSlotLoading,
  );
  useEffect(() => {
    dispatch(dateTimeSlotRequested(clinicid ?? ''));
  }, []);

  const [selectedDateId, setselectedDateId] = useState<any>(null);
  const [selectedTimeSlots, setselectedTimeSlots] = useState<any[]>([]);
  const [selectedTimeSlot, setselectedTimeSlot] = useState<any>(null);

  // Handler for chip selection
  const handleDateSelect = (item: any) => {
    setselectedDateId(item);

    setselectedTimeSlots(item?.hourAndSlot);

    setselectedTimeSlot(item?.hourAndSlot[0]);
  };

  const handleTimeSlotSelect = (item: any) => {
    setselectedTimeSlot(item);
    // Handle chip selection logic here
  };

  const handleNavigation = () => {
    navigation.navigate('appoinmentdetails');
  };

  const handleButtonClick = () => {
    const payload = {
      appointmentId: appoinmentId ?? '',
      isDeleted: false,
      bookingDate: parseDateString(selectedDateId?.value),
      bookingTime: selectedTimeSlot?.value,
      bookingHourId: selectedTimeSlot?.id,
      bookingDayId: selectedDateId?.id,
    };
    console.log(new Date(selectedDateId?.value), 'updated data');

    dispatch(updateAppointmentRequested(payload));
    navigation.navigate('appointmentdetails');
  };

  useEffect(() => {
    if (dateSlots?.length > 0) {
      setselectedDateId(dateSlots[0]);
      setselectedTimeSlots(dateSlots[0]?.hourAndSlot);

      setselectedTimeSlot(dateSlots[0]?.hourAndSlot[0]);
    }
  }, [dateSlots, clinicid]);

  return (
    <Layout navigation={handleNavigation} headerText="Choose date and time">
      {loading || !selectedTimeSlot || !selectedDateId ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.subtitle}>{'Choose date'}</Text>
          <ChipsGrid
            data={dateSlots}
            onSelect={handleDateSelect}
            selectedId={selectedDateId}
            type="date"
          />
          <Text style={styles.subtitle}>{'Choose time'}</Text>
          <ChipsGrid
            data={selectedTimeSlots}
            onSelect={handleTimeSlotSelect}
            selectedId={selectedTimeSlot}
            type="time"
          />
          <Button
            mode="contained"
            onPress={handleButtonClick}
            style={styles.button}
            labelStyle={styles.buttonLabel}>
            Next
          </Button>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 30,
    color: colors.textColor,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 20,
    color: colors.textColor,
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

export default ChooseDateandTime;
