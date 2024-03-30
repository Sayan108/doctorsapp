import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Layout from '../components/layOut';
import {colors} from '../styles';
import {Button, TextInput} from 'react-native-paper';

const MyProfile = ({navigation}: {navigation: any}) => {
  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const [profileDetails, setprofileDetails] = useState<any>({
    fullname: ' Jane Austine',

    phone: '9876543210',
  });
  const [editMode, setEditMode] = useState<boolean>(true);
  return (
    <Layout navigation={handleNavigation} headerText="My profile">
      <TextInput
        maxLength={50}
        disabled={editMode}
        value={profileDetails?.fullname}
        label="Full name"
        mode="outlined"
        onChangeText={(text: string) => {
          setprofileDetails({...profileDetails, fullname: text});
        }}
        style={styles.input}
        placeholder="Jhon Doe"
        placeholderTextColor="gray"
        activeOutlineColor={colors.primaryColor}
      />

      <TextInput
        disabled={editMode}
        activeOutlineColor={colors.primaryColor}
        maxLength={10}
        value={profileDetails?.phone}
        label="Phone"
        mode="outlined"
        onChangeText={(text: string) => {
          setprofileDetails({...profileDetails, phone: text});
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
