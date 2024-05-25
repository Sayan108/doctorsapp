import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';

import ChipsGrid from '../components/gridRadioButtons';
import {colors} from '../styles';
import Layout from '../components/layOut';
import {RootState} from '../redux';
import { Calendar } from 'react-native-calendars';
import { theme } from '../theme/theme';

const ChooseDateAndTime = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {

  const [selected, setSelected] = useState('');

  const {id} = route.params;
  const dispatch = useDispatch();
  const dateSlots = useSelector(
    (state: RootState) => state.userdata.dateSlots.data,
  );
  const timeSlots = useSelector(
    (state: RootState) => state.userdata.timeSlots.data,
  );

  const [selectedDateId, setselectedDateId] = useState<any>(dateSlots[0]);
  const [selectedTimeSlot, setselectedTimeSlot] = useState<any>(timeSlots[0]);

  // Handler for chip selection
  const handleDateSelect = (item: any) => {
    setselectedDateId(item);
  };

  const handleTimeSlotSelect = (item: any) => {
    setselectedTimeSlot(item);
    // Handle chip selection logic here
  };

  const handleNavigation = () => {
    navigation.navigate('appointmentlist');
  };

  return (
    <Layout navigation={handleNavigation} headerText="Choose date and time">
      <Text style={styles.subtitle}>{'Choose date'}</Text>
      <Calendar
      style={{
        // backgroundColor:theme.colors.secondaryContainer,
        borderColor:theme.colors.outline
        
      }}
      theme={{
        backgroundColor: theme.colors.secondary,
        calendarBackground: theme.colors.surface,
        textSectionTitleColor: theme.colors.onSurface,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: theme.colors.onPrimary,
        todayTextColor: theme.colors.onSurface,
        dayTextColor: theme.colors.onSurface,
        textDisabledColor: theme.colors.surfaceDisabled

      }}
      current={'2024-05-01'}

      onDayPress={day => {
        setSelected(day.dateString);
      }}

    />
      <Text style={styles.subtitle}>{'Choose time'}</Text>
      
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(
            id === -1 ? 'appointmentdetails' : 'appointmentdetails',
            {
              id: id,
            },
          );
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Reschedule
      </Button>
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

export default ChooseDateAndTime;
