import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../styles';

export default function AppointmentOverView({navigation}: {navigation: any}) {
  const total = 42;
  const newPatients = 40;
  const todaysAppointments = 45;
  const percentage = (todaysAppointments / total) * 100;

  return (
    <View
      style={{
        height: 'auto',
        width: '98%',
        borderColor: colors.primaryColor,
        borderWidth: 1,
        backgroundColor: 'rgba(245, 71, 73, 0.025)',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        paddingRight: 10,
        borderRadius: 20,
        alignItems: 'flex-start',
        marginTop: 15,
      }}>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <Text
          style={{
            color: colors.textColor,
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 26,
          }}>
          {`Total ${total}`}
        </Text>
      </View>
      <View
        style={{
          height: 46,
          width: 248,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'flex-end'}}>
          <Text
            style={{fontSize: 16, fontWeight: '400', color: colors.textColor}}>
            Today's appoinments
          </Text>
          <Text
            style={{fontSize: 16, fontWeight: '400', color: colors.textColor}}>
            {todaysAppointments}
          </Text>
        </View>
        <View
          style={{
            width: 100,
            height: 30,
            padding: 4,
            paddingHorizontal: 8,
            gap: 8,
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: 'rgba(53, 184, 42, 0.5)',
            marginLeft: 35,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: colors.textColor,
              textAlign: 'center',
            }}>
            {percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 46,
          width: 248,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'flex-end'}}>
          <Text
            style={{fontSize: 16, fontWeight: '400', color: colors.textColor}}>
            New patinet
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: colors.textColor,
            }}>
            {newPatients}
          </Text>
        </View>
        <View
          style={{
            width: 100,
            height: 30,
            padding: 4,
            paddingHorizontal: 8,
            gap: 8,
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: 'rgba(53, 184, 42, 0.5)',
            marginLeft: 100,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '400',
              color: colors.textColor,
              textAlign: 'center',
            }}>
            {percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
