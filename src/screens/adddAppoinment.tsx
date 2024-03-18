import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, RadioButton} from 'react-native-paper';

import HelperText from '../components/helperText';
import {colors} from '../styles';
import Layout from '../components/layOut';
import {useDispatch} from 'react-redux';
import {updateAppoinmentForm} from '../redux/silces/userdata.slice';

const AddAppointment = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [appointmentDetails, setAppointmentDetails] = useState<any>({});
  const [showDropDown, setshowDropDown] = useState(false);
  const handleNavigation = () => {
    navigation.navigate('home');
  };
  return (
    <Layout navigation={handleNavigation} headerText="Add an appoinment">
      <TextInput
        maxLength={50}
        autoFocus
        value={appointmentDetails?.patientName}
        label="Full name"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, patientName: text});
        }}
        style={styles.input}
        placeholder="Jhon Doe"
        placeholderTextColor="gray"
        activeOutlineColor={colors.primaryColor}
      />
      <HelperText
        text="This field is required"
        type="error"
        show={appointmentDetails?.patientName?.length === 0}
      />
      <TextInput
        activeOutlineColor={colors.primaryColor}
        maxLength={2}
        value={appointmentDetails?.age}
        label="Age"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, age: text});
        }}
        style={styles.input}
        placeholder="28"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />
      <HelperText
        text="This field is required"
        type="error"
        show={appointmentDetails?.age?.length === 0}
      />
      <TextInput
        caretHidden={true}
        cursorColor="white"
        onPressIn={() => {
          setshowDropDown(true);
        }}
        activeOutlineColor={colors.primaryColor}
        //  maxLength={15}
        value={appointmentDetails?.gender}
        label="Gender"
        mode="outlined"
        style={styles.input}
        placeholder="Choose gender"
        placeholderTextColor="gray"
      />
      {showDropDown ? (
        <View
          style={{
            height: '20%',
            width: '35%',
            elevation: 100,
            borderColor: 'black',

            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <RadioButton.Group
            onValueChange={newValue => {
              setAppointmentDetails({...appointmentDetails, gender: newValue});
              setshowDropDown(false);
            }}
            value={appointmentDetails.gender}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <RadioButton value="Male" color={colors.primaryColor} />
              <Text style={{marginLeft: 8}}>Male</Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <RadioButton value="Female" color={colors.primaryColor} />
              <Text style={{marginLeft: 8}}>Female</Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <RadioButton value="Non binary" color={colors.primaryColor} />
              <Text style={{marginLeft: 8}}>Non binary</Text>
            </View>
          </RadioButton.Group>
        </View>
      ) : null}

      <HelperText
        text="This field is required"
        type="error"
        show={appointmentDetails?.gender?.length === 0}
      />
      <TextInput
        activeOutlineColor={colors.primaryColor}
        maxLength={10}
        value={appointmentDetails?.patientPhone}
        label="Phone"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, patientPhone: text});
        }}
        style={styles.input}
        placeholder="1234567890"
        placeholderTextColor="gray"
        keyboardType="phone-pad"
      />
      <HelperText
        text="This field is required"
        type="error"
        show={appointmentDetails?.phone?.length === 0}
      />
      <TextInput
        activeOutlineColor={colors.primaryColor}
        maxLength={500}
        value={appointmentDetails?.problem}
        label="Describe your problem"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, problem: text});
        }}
        style={{...styles.input, height: 100}}
        placeholder="Describe your problem briefly"
        placeholderTextColor="gray"
        multiline
      />
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('chooseclinic');
          dispatch(updateAppoinmentForm(appointmentDetails));
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Next
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
    fontWeight: '600',
    marginLeft: 30,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
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

export default AddAppointment;
