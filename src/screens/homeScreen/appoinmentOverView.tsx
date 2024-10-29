import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Provider} from 'react-native-paper';
import {theme} from '../../theme/theme';
import {Text} from 'react-native-paper';
import {getDashBoardData} from '../../services/appointments/appoinment.services';
import {doctorId} from '../../redux/redux.constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

export default function AppointmentOverView({
  navigation,
}: {
  navigation: any;
  dashboardData: any;
}) {
  const total = 42;
  const newPatients = 40;
  const todaysAppointments = 45;
  const percentage = (todaysAppointments / total) * 100;
  const {loading, dashboardData} = useSelector(
    (state: RootState) => state.userdata.dashboardData,
  );
  return (
    <Provider theme={theme}>
      {!loading ? (
        <View
          style={[styles.container, {backgroundColor: theme.colors.primary}]}>
          <Text variant="headlineLarge" style={{color: theme.colors.onPrimary}}>
            {`Today's appointments ${dashboardData?.todaysAppointments ?? 0}`}
          </Text>

          {/* Today's Appointments Section */}
          <View style={styles.row}>
            <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
              Total appointments {dashboardData?.totalAppointments ?? 0}
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
    display: 'flex',
    minHeight: 160,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    justifyContent: 'space-evenly',

    // alignItems: 'flex-start',
  },
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  percentageBox: {
    width: 80,
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
