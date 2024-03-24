import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {getAppoinmentDetailsRequested} from '../redux/silces/userdata.slice';

const AppoinmentCard = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const appoinmentDetails = useSelector(
    (state: RootState) => state.userdata.upcomingAppoinment.data,
  );

  return (
    <>
      {appoinmentDetails && (
        <Pressable
          onPress={() => {
            dispatch(
              getAppoinmentDetailsRequested(
                parseInt(appoinmentDetails.appoinmentId) - 1,
              ),
            );
            navigation.navigate('appoinmentdetails', {
              id: appoinmentDetails.appoinmentId,
            });
          }}>
          <View
            style={{
              height: 186,
              width: '98%',
              backgroundColor: 'rgba(245, 71, 73, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              padding: 10,
              paddingRight: 10,
              borderRadius: 20,
              alignItems: 'flex-start',
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon
                name="doctor"
                color="black"
                style={{color: 'black', justifyContent: 'space-between'}}
                size={45}
              />
              <View style={{justifyContent: 'space-between'}}>
                <View style={{paddingLeft: 20}}>
                  <Text
                    style={{
                      color: colors.textColor,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {appoinmentDetails.patientName}
                  </Text>
                  <Text
                    style={{
                      color: colors.textColor,
                      fontSize: 14,
                      paddingTop: 5,
                    }}>
                    {appoinmentDetails.doctorName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
              }}>
              <View
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderRadius: 20,
                  backgroundColor: 'rgba(245, 71, 73, 0.3)',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Icon
                  name="calendar-blank"
                  color="black"
                  style={{
                    color: 'black',
                    justifyContent: 'space-between',
                    paddingLeft: 5,
                  }}
                  size={25}
                />
                <Text
                  style={{
                    color: 'black',
                    justifyContent: 'space-between',
                    padding: 6,
                  }}>
                  {appoinmentDetails.appoinmentDate}
                </Text>
              </View>
              <View
                style={{
                  height: 'auto',
                  width: 'auto',
                  borderRadius: 20,
                  backgroundColor: 'rgba(245, 71, 73, 0.3)',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginLeft: 60,
                }}>
                <Icon
                  name="clock-outline"
                  color="black"
                  style={{
                    color: 'black',
                    justifyContent: 'space-between',
                    paddingLeft: 5,
                  }}
                  size={25}
                />
                <Text
                  style={{
                    color: 'black',
                    justifyContent: 'space-between',
                    padding: 6,
                  }}>
                  {appoinmentDetails.appoinmentTime}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 'auto',
                width: 'auto',
                borderRadius: 20,
                backgroundColor: 'rgba(245, 71, 73, 0.3)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Icon
                name="map-marker-outline"
                color="black"
                style={{
                  color: 'black',
                  justifyContent: 'space-between',
                  paddingLeft: 5,
                }}
                size={25}
              />
              <Text
                style={{
                  color: 'black',
                  justifyContent: 'flex-start',
                  padding: 6,
                }}>
                {appoinmentDetails.clinicAddress}
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default AppoinmentCard;
