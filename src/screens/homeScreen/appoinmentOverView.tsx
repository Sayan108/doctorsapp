import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Provider} from 'react-native-paper';
import {theme} from '../../theme/theme';
import {Text} from 'react-native-paper';
import {getDashBoardData} from '../../services/appointments/appoinment.services';
import {doctorId} from '../../redux/redux.constants';

export default function AppointmentOverView({navigation}: {navigation: any}) {
  const total = 42;
  const newPatients = 40;
  const todaysAppointments = 45;
  const percentage = (todaysAppointments / total) * 100;
  const [dashboardData, setdashboardData] = useState<any>(null);
  const getDashBoardDatGetter = async () => {
    try {
      const data = await getDashBoardData();
      setdashboardData(data?.data?.data);
      console.log(data?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getDashBoardDatGetter();
  }, [doctorId]);

  return (
    <Provider theme={theme}>
      {dashboardData !== null ? (
        <View
          style={[styles.container, {backgroundColor: theme.colors.primary}]}>
          <Text variant="headlineLarge" style={{color: theme.colors.onPrimary}}>
            {`Today's appointments ${dashboardData?.todaysAppointments}`}
          </Text>

          {/* Today's Appointments Section */}
          <View style={styles.row}>
            <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
              Total appointments {dashboardData?.totalAppointments}
            </Text>
            <View
              style={[
                styles.percentageBox,
                {backgroundColor: theme.colors.success},
              ]}>
              <Text variant="bodyLarge" style={{color: theme.colors.onSuccess}}>
                {percentage.toFixed(2)}%
              </Text>
            </View>
          </View>

          {/* New Patients Section */}
          {/* <View style={styles.row}>
            <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
              Old patients {newPatients}
            </Text>
            <View
              style={[
                styles.percentageBox,
                {backgroundColor: theme.colors.success},
              ]}>
              <Text variant="bodyLarge" style={{color: theme.colors.onSuccess}}>
                {percentage.toFixed(2)}%
              </Text>
            </View>
          </View> */}
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          style={{marginTop: '25%', marginHorizontal: 10}}
        />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'flex-start',
    gap: 10,
  },
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  percentageBox: {
    width: 100,
    height: 30,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  titleMain: {
    fontWeight: '600',
  },
});
