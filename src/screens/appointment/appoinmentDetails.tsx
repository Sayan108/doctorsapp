import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {List, Button, useTheme, Surface} from 'react-native-paper';
import {useSelector} from 'react-redux';
import CancelAppointmentDialog from '../../components/cancelAppoinmentDialogue';
import Layout from '../../components/layOut';
import MarkAsDoneDialog from '../../components/markAsDoneDialog';
import {RootState} from '../../redux';
import {colors} from '../../styles';
import {Text} from 'react-native-paper';

interface modalSate {
  isOpen: boolean;
  text: string;
}
const AppointmentDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const theme = useTheme();

  const [visible, setvisible] = useState<boolean>(false);
  const [showCancelModal, setshowCancelModal] = useState<boolean>(false);
  const [showMarkAssDoneModal, setshowMarkAssDoneModal] = useState(false);
  const {id} = route.params;

  const handleNavigation = () => {
    navigation.navigate('home');
  };
  const {data} = useSelector(
    (state: RootState) => state.userdata.currentAppointmentDetails,
  );
  return (
    <Layout headerText="Booking details" navigation={handleNavigation}>
      {/* cancel modal */}
      {showCancelModal ? (
        <CancelAppointmentDialog
          visible={showCancelModal}
          setVisible={setshowCancelModal}
        />
      ) : showMarkAssDoneModal ? (
        <MarkAsDoneDialog
          visible={showMarkAssDoneModal}
          setVisible={setshowMarkAssDoneModal}
        />
      ) : (
        <ScrollView>
          <View
            style={[styles.container, {backgroundColor: theme.colors.surface}]}>
            {/* patient details text and three dots */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                // borderWidth: 1,
                // borderColor: theme.colors.onSurface,
                justifyContent: 'center',
                alignContent: 'center',
                paddingLeft: 6,
              }}>
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurface,
                }}>
                Patient Details
              </Text>

              <Pressable
                style={{marginLeft: '55%', justifyContent: 'flex-end'}}
                onPress={() => {
                  setvisible(!visible);
                }}>
                <Icon
                  name="dots-vertical"
                  color={theme.colors.onSurfaceVariant}
                  size={30}
                  style={[{color: theme.colors.onSurfaceVariant}]}
                />
              </Pressable>
              {visible ? (
                <Surface
                  style={[
                    styles.cancelButton,
                    {
                      backgroundColor: theme.colors.surfaceVariant,
                      shadowColor: theme.colors.shadow,
                    },
                  ]}>
                  <List.Section>
                    <List.Item
                      title="Cancel"
                      titleStyle={{
                        color: theme.colors.onSurfaceVariant,
                      }}
                      left={() => (
                        <Icon
                          // style={{paddingLeft: 10}}
                          name="cancel"
                          size={24}
                          color={theme.colors.onSecondary}
                        />
                      )}
                      onPress={() => {
                        setshowCancelModal(true);
                        setvisible(!visible);
                      }}
                    />
                  </List.Section>
                </Surface>
              ) : null}
            </View>

            {/* patient details section */}
            <View
              style={[
                styles.section,
                {backgroundColor: theme.colors.surfaceVariant},
              ]}>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Name: {data?.patientName}
              </Text>
              {/* <Text style={styles.sectionDetails}>Email: {data.email}</Text> */}
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Phone: {data?.clinicPhone}
              </Text>
            </View>

            {/* booking details */}
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurface,
                marginLeft: 10,
              }}>
              Booking Details
            </Text>

            <View
              style={[
                styles.section,
                {backgroundColor: theme.colors.surfaceVariant},
              ]}>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Booking id: {data?.appointmentId}
              </Text>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Date: {data?.appointmentDate}
              </Text>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Time: {data?.appointmentTime}
              </Text>
            </View>

            {/* payment details */}
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurface,
                marginLeft: 10,
              }}>
              Payment Details
            </Text>

            <View
              style={[
                styles.section,
                {backgroundColor: theme.colors.surfaceVariant},
              ]}>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Payment id: {data?.paymentDetails?.paymentId}
              </Text>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Payment Method: {data?.paymentDetails?.paymentType}
              </Text>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                Total Amount: {data?.paymentDetails?.ammount}
              </Text>
            </View>

            {/* Problem details */}
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurface,
                marginLeft: 10,
              }}>
              Problem
            </Text>
            <View
              style={[
                styles.section,
                {backgroundColor: theme.colors.surfaceVariant},
              ]}>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurfaceVariant}}>
                {data?.problem}
              </Text>
            </View>
          </View>

         
        </ScrollView>
      )}
       {/* buttons */}
       <View
            style={[
              styles.buttonContainer,
              {backgroundColor: theme.colors.surface},
            ]}>
            <Button
              style={{
                backgroundColor: theme.colors.primary,
                padding: 6,
                borderRadius: 4,
              }}
              mode="contained"
              onPress={() => {
                setshowMarkAssDoneModal(true);
              }}
              // style={[styles.button]}
            >
              Mark as done
            </Button>
            <Button
              style={{
                borderRadius: 4,
                padding: 6,
              }}
              mode="outlined"
              onPress={() => {
                navigation.navigate('reschedule');
              }}
              // style={styles.buttonOutline}
            >
              Reschedule
            </Button>
          </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom:10
  },

  cancelButton: {
    display: 'flex',
    position: 'absolute',
    top: 60, // Adjust as needed
    left: '50%',
    right: 0,
    zIndex: 10, // Ensure the menu is above other elements
    // elevation: 400,
    width: '50%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  section: {
    width: 'auto',
    borderRadius: 10,
    margin: 12,
    padding: 10,
    borderColor: colors.primaryColor,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.textColor,
  },
  sectionDetails: {
    fontSize: 14,

    marginBottom: 8,
    color: colors.textColor,
  },
  button: {
    marginTop: 24,
  },
  buttonOutline: {
    marginTop: 24,
  },

  textBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
  },

  buttonContainer: {
    display: 'flex',
    gap: 24,
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default AppointmentDetails;
