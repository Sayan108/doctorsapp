import {StyleSheet} from 'react-native';
import React, {UIEventHandler, useState} from 'react';
import Layout from '../components/layOut';
import {colors} from '../styles';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const MyProfile = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const profileDetails = useSelector((state: RootState) => state.auth.userDetails);

  // const [profileDetails, setprofileDetails] = useState<any>({
  //   fullname: ' Jane Austine',

  //   phone: '9876543210',
  // });
  const [editMode, setEditMode] = useState<boolean>(false);

  const mode: 'outlined' | 'flat' = editMode ? 'outlined' : 'flat';

  return (
    <Layout navigation={handleNavigation} headerText="My profile">
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.surface,
          display: 'flex',
          gap: 12,
        }}>
        <TextInput
          maxLength={50}
          disabled={!editMode}
          value={profileDetails?.fullname}
          label="Full name"
          mode={mode}
          onChangeText={(text: string) => {
            // profileDetails({...profileDetails, fullname: text});
          }}
          // style={styles.input}
          placeholder="Jhon Doe"
          // placeholderTextColor={theme.colors.surfaceDisabled}
          // activeOutlineColor={theme.colors.primary}
          // outlineColor={theme.colors.outline}
        />

        <TextInput
          disabled={!editMode}
          // activeOutlineColor={colors.primaryColor}
          maxLength={10}
          value={profileDetails?.phoneNumber}
          label="Phone"
          mode={mode}
          onChangeText={(text: string) => {
            // setprofileDetails({...profileDetails, phone: text});
          }}
          // style={styles.input}
          placeholder="1234567890"
          // placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
      </SafeAreaView>
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
