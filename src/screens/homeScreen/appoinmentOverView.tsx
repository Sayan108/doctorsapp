import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Provider, useTheme} from 'react-native-paper';
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
    <Provider>
      {!loading ? (
        <View style={styles.container}>
          {/* Todays appointment box */}
          <View
            style={[
              styles.gridItem,
              {backgroundColor: theme.colors.successContainer},
            ]}>
            <Text
              style={{color: theme.colors.onSuccessContainer}}
              variant="titleLarge">
              {' '}
              Today{' '}
            </Text>
            <Text
              style={{color: theme.colors.onSuccessContainer}}
              variant="displayMedium">
              23
            </Text>
          </View>

          {/* upcoming appointment box */}
          <View
            style={[
              styles.gridItem,
              {backgroundColor: theme.colors.statusUpcoming},
            ]}>
            <Text
              style={{color: theme.colors.onStatusUpcomingContainer}}
              variant="titleLarge">
              {' '}
              Upcoming{' '}
            </Text>
            <Text
              style={{color: theme.colors.onStatusUpcomingContainer}}
              variant="displayMedium">
              23
            </Text>
          </View>

          {/* Total appointment box */}
          <View
            style={[
              styles.gridItem,
              {backgroundColor: theme.colors.primaryContainer},
            ]}>
            <Text
              style={{color: theme.colors.onPrimaryContainer}}
              variant="titleLarge">
              {' '}
              Total{' '}
            </Text>
            <Text
              style={{color: theme.colors.onPrimaryContainer}}
              variant="displayMedium">
              23
            </Text>
          </View>

          {/* canceled appointment box */}
          <View
            style={[
              styles.gridItem,
              {backgroundColor: theme.colors.errorContainer},
            ]}>
            <Text
              style={{color: theme.colors.onErrorContainer}}
              variant="titleLarge">
              {' '}
              Canceled{' '}
            </Text>
            <Text
              style={{color: theme.colors.onErrorContainer}}
              variant="displayMedium">
              23
            </Text>
          </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  gridItem: {
    width: '44%', // Width to fit 2 items per row
    height: 100, // Adjust height as needed
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 8,
    padding: 4,
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
