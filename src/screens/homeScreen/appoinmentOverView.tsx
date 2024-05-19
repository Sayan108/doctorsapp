import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../styles';
import {Provider} from 'react-native-paper';
import {theme} from '../../theme/theme';
import {Text} from 'react-native-paper';

export default function AppointmentOverView({navigation}: {navigation: any}) {
  const total = 42;
  const newPatients = 40;
  const todaysAppointments = 45;
  const percentage = (todaysAppointments / total) * 100;

  return (
    <Provider theme={theme}>
      <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
        <Text variant="titleLarge" style={{color: theme.colors.onPrimary}}>
          {`Total ${total}`}
        </Text>

        {/* Today's Appointments Section */}
        <View style={styles.row}>
          <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
            Today's appointments {todaysAppointments}
          </Text>
          <View style={styles.percentageBox}>
            <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
              {percentage.toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* New Patients Section */}
        <View style={styles.row}>
          <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
            New patients {newPatients}
          </Text>
          <View style={styles.percentageBox}>
            <Text variant="bodyLarge" style={{color: theme.colors.onPrimary}}>
              {percentage.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: 'flex-start',
    gap: 16,
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
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(53, 184, 42, 0.5)',
  },
});
