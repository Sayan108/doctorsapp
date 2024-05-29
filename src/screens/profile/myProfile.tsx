import {StyleSheet} from 'react-native';
import React, {UIEventHandler, useState} from 'react';
import Layout from '../../components/layOut';
import {colors} from '../../styles';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

const MyProfile = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const profileDetails = useSelector(
    (state: RootState) => state.auth.userDetails,
  );

  // const [profileDetails, setprofileDetails] = useState<any>({
  //   fullname: ' Jane Austine',

  //   phone: '9876543210',
  // });

  const [isTextChanged, setTextChange] = useState(false);


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
          onChangeText={()=>{setTextChange(!isTextChanged)}}
          placeholder="Jhon Doe"
        />

        <TextInput
          disabled={!editMode}
          maxLength={10}
          value={profileDetails?.phoneNumber}
          label="Phone"
          mode={mode}
          onChangeText={()=>{setTextChange(!isTextChanged)}}
          placeholder="1234567890"
          keyboardType="phone-pad"
        />
      </SafeAreaView>
      <Button
        mode="contained"
        onPress={() => {
          setEditMode(!editMode);
        }}
        style={{
          ...styles.button,
          backgroundColor: theme.colors.primary,
        }}
        disabled = {isTextChanged}
        >
        {editMode ? 'Save' : 'Edit'}
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
    padding: 6,
    borderRadius: 4,
    marginTop: 50,
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyProfile;
