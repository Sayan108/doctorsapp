import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import Layout from '../components/layOut';
import {colors} from '../styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {List, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import CancelAppointmentDialog from '../components/cancelAppoinmentDialogue';
import MarkAsDoneDialog from '../components/markAsDoneDialog';
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
          <View style={styles.container}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                //  backgroundColor: 'black',
              }}>
              <Text
                style={{
                  ...styles.sectionHeading,
                  justifyContent: 'flex-start',
                }}>
                Patient Details
              </Text>
              <Pressable
                style={{marginLeft: '55%', justifyContent: 'flex-end'}}
                onPress={() => {
                  setvisible(!visible);
                }}>
                <Icon name="dots-vertical" color={colors.textColor} size={30} />
              </Pressable>
              {visible ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 60, // Adjust as needed
                    left: '50%',
                    right: 0,
                    backgroundColor: 'rgba(255,255 ,255 ,1)',
                    zIndex: 10, // Ensure the menu is above other elements
                    elevation: 400,
                    width: '50%',
                    borderRadius: 25,
                    shadowColor: 'black',
                  }}>
                  <List.Section>
                    <List.Item
                      title="Cancel"
                      titleStyle={{
                        color: 'black', // Text color
                      }}
                      left={() => (
                        <Icon
                          style={{paddingLeft: 10}}
                          name="cancel"
                          size={35}
                          color={colors.textColor}
                        />
                      )}
                      onPress={() => {
                        setshowCancelModal(true);
                        setvisible(!visible);
                      }}
                    />
                  </List.Section>
                </View>
              ) : null}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionDetails}>
                Name: {data?.patientName}
              </Text>
              {/* <Text style={styles.sectionDetails}>Email: {data.email}</Text> */}
              <Text style={styles.sectionDetails}>
                Phone: {data?.clinicPhone}
              </Text>
            </View>
            <Text style={styles.sectionHeading}>Booking Details</Text>
            <View style={styles.section}>
              <Text style={styles.sectionDetails}>
                Booking id: {data?.appointmentId}
              </Text>
              <Text style={styles.sectionDetails}>
                Date: {data?.appointmentDate}
              </Text>
              <Text style={styles.sectionDetails}>
                Time: {data?.appointmentTime}
              </Text>
            </View>
            <Text style={styles.sectionHeading}>Payment Details</Text>
            <View style={styles.section}>
              <Text style={styles.sectionDetails}>
                Payment id: {data?.paymentDetails?.paymentId}
              </Text>
              <Text style={styles.sectionDetails}>
                Payment Method: {data?.paymentDetails?.paymentType}
              </Text>
              <Text style={styles.sectionDetails}>
                Total Amount: {data?.paymentDetails?.ammount}
              </Text>
            </View>
            <Text style={styles.sectionHeading}>Problem</Text>
            <View style={styles.section}>
              <Text style={styles.sectionDetails}>{data?.problem}</Text>
            </View>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              setshowMarkAssDoneModal(true);
            }}
            style={styles.button}
            labelStyle={styles.buttonLabel}>
            Mark as done
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate('reschedule');
            }}
            style={styles.buttonOutline}
            labelStyle={styles.buttonLabelOutline}>
            Reschedule
          </Button>
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.textColor,
  },
  section: {
    width: 'auto',
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'rgba(245, 71, 73, 0.08)',
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
    backgroundColor: colors.primaryColor,
  },
  buttonOutline: {
    marginTop: 24,
    backgroundColor: 'transparent',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonLabelOutline: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AppointmentDetails;
