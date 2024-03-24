import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Layout from '../components/layOut';
import {colors} from '../styles';
import {Button, TextInput} from 'react-native-paper';

const MyProfile = ({navigation}: {navigation: any}) => {
  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const [appointmentDetails, setAppointmentDetails] = useState<any>({
    fullname: ' Jane Austine',
    age: '23',
    gender: 'Female',
    phone: '9876543210',
  });
  const [editMode, setEditMode] = useState<boolean>(true);
  return (
    <Layout navigation={handleNavigation} headerText="My profile">
      <TextInput
        maxLength={50}
        disabled={editMode}
        value={appointmentDetails?.fullname}
        label="Full name"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, fullname: text});
        }}
        style={styles.input}
        placeholder="Jhon Doe"
        placeholderTextColor="gray"
        activeOutlineColor={colors.primaryColor}
      />

      <TextInput
        disabled={editMode}
        activeOutlineColor={colors.primaryColor}
        maxLength={2}
        value={appointmentDetails?.age}
        label="Age"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, age: text});
        }}
        style={styles.input}
        placeholder="69"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />

      <TextInput
        disabled={editMode}
        activeOutlineColor={colors.primaryColor}
        maxLength={15}
        value={appointmentDetails?.gender}
        label="Gender"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, gender: text});
        }}
        style={styles.input}
        placeholder="Male"
        placeholderTextColor="gray"
      />

      <TextInput
        disabled={editMode}
        activeOutlineColor={colors.primaryColor}
        maxLength={10}
        value={appointmentDetails?.phone}
        label="Phone"
        mode="outlined"
        onChangeText={(text: string) => {
          setAppointmentDetails({...appointmentDetails, phone: text});
        }}
        style={styles.input}
        placeholder="1234567890"
        placeholderTextColor="gray"
        keyboardType="phone-pad"
      />

      <Button
        mode="contained"
        onPress={() => {
          setEditMode(!editMode);
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        {editMode ? 'Edit' : 'Update'}
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

export default MyProfile;
