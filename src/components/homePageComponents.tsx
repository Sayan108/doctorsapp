import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {Appbar, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles';
import AppointmentCard from './appoinmentCard';
import AddAppoinmentButton from './addAppoinmentButton';

import LogoutDialoge from './logOutDialogue';
import AppoinmentOverView from './appoinmentOverView';

const HomePageComponent = (props: any) => {
  const {setIndex, navigation} = props;
  // const dispatch = useDispatch();

  const [visible, setvisible] = useState<boolean>(false);
  const [showLogout, setshowLogout] = useState<boolean>(false);
  return (
    <View style={{height: '100%'}}>
      <Appbar.Header>
        <Icon
          style={{paddingLeft: 10}}
          name="account-circle-outline"
          size={35}
          color={colors.primaryColor}
          onPress={() => {
            setvisible(!visible);
          }}
        />
      </Appbar.Header>
      {visible ? (
        <View
          style={{
            position: 'absolute',
            top: 60, // Adjust as needed
            left: 10,
            right: 0,
            backgroundColor: 'rgba(255,255 ,255 ,1)',
            zIndex: 10, // Ensure the menu is above other elements
            elevation: 400,
            width: '60%',
            borderRadius: 25,
          }}>
          <List.Section>
            <List.Item
              title="My profile"
              titleStyle={{
                color: 'black', // Text color
              }}
              left={() => (
                <Icon
                  style={{paddingLeft: 10}}
                  name="account-circle-outline"
                  size={35}
                  color={colors.textColor}
                />
              )}
              onPress={() => {
                navigation.navigate('myprofile');
                setvisible(!visible);
              }}
            />

            <List.Item
              title="Log out"
              titleStyle={{
                color: 'black', // Text color
              }}
              left={() => (
                <Icon
                  style={{paddingLeft: 10}}
                  name="logout"
                  size={35}
                  color={colors.textColor}
                />
              )}
              onPress={() => {
                setshowLogout(true);
                setvisible(false);
              }}
            />
          </List.Section>
        </View>
      ) : null}

      {showLogout ? (
        <LogoutDialoge visible={showLogout} setVisible={setshowLogout} />
      ) : (
        <View>
          <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
            <Text
              style={{
                color: colors.textColor,
                justifyContent: 'flex-start',
                fontSize: 18,
                marginBottom: 5,
              }}>
              Appoinment overview
            </Text>
            <AppoinmentOverView navigation={navigation} />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: 25,
              marginLeft: 10,
              width: '100%',
            }}>
            <Text
              style={{
                color: colors.textColor,
                justifyContent: 'flex-start',
                fontSize: 18,
              }}>
              Upcoming appoinments
            </Text>
            <Text
              style={{
                marginLeft: 60,
                justifyContent: 'flex-end',
                color: colors.primaryColor,
                fontSize: 16,
              }}
              onPress={() => {
                setIndex(1);
              }}>
              See all
            </Text>
          </View>

          <View style={{marginTop: 10, marginLeft: 10, height: '100%'}}>
            <AppointmentCard navigation={navigation} />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomePageComponent;
