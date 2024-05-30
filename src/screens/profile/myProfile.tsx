import {StyleSheet} from 'react-native';
import React, {UIEventHandler, useEffect, useState} from 'react';
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

  const profileInfo = useSelector((state: RootState) => state.auth.userDetails);

  const [profileDetails, setProfileDetails] = useState<{
    fullname: string;
    phone: string;
  }>({
    fullname: profileInfo?.fullname || '',
    phone: profileInfo?.phoneNumber || '',
  });

  const [isTextChanged, setTextChange] = useState(false);

  // const [editMode, setEditMode] = useState<boolean>(false);

  // const mode: 'outlined' | 'flat' = editMode ? 'outlined' : 'flat';

  const [originalFullName, setOriginalFullName] = useState(
    profileInfo?.fullname || '',
  );

  const [originalPhoneNumber, setOriginalPhoneNumber] = useState(
    profileInfo?.phoneNumber || '',
  );

  useEffect(() => {
    console.log('profileDetails', profileDetails);
    if (
      profileDetails.fullname.length === 0 ||
      profileDetails.phone.length === 0
    ) {
      
      setTextChange(false);
    } else if (
      originalFullName !== profileDetails.fullname ||
      originalPhoneNumber !== profileDetails.phone
    ) {
      setOriginalFullName(profileDetails.fullname);
      setOriginalPhoneNumber(profileDetails.phone);
      setTextChange(true);
    }
  }, [profileDetails]);

  const handleFullNameChange = (text: string) => {
    // setFullName(text);
    // setTextChange(
    //   text !== originalFullName || phoneNumber !== originalPhoneNumber,
    // );
  };

  const handlePhoneNumberChange = (text: string) => {
    // setPhoneNumber(text);
    // setTextChange(
    //   fullName !== originalFullName || text !== originalPhoneNumber,
    // );
  };
  console.log('istextChanged', isTextChanged);

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
          // disabled={!editMode}
          value={profileDetails?.fullname}
          label="Full name"
          // mode={mode}
          mode="outlined"
          onChangeText={(text: string) => {
            setProfileDetails({...profileDetails, fullname: text});
          }}
          placeholder="Jhon Doe"
        />

        <TextInput
          // disabled={!editMode}
          maxLength={10}
          value={profileDetails?.phone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setProfileDetails({...profileDetails, phone: text});
          }}
          placeholder="1234567890"
          keyboardType="phone-pad"
        />
      </SafeAreaView>
      <Button
        mode="contained"
        onPress={() => {
          setTextChange(!isTextChanged);
        }}
        style={{
          ...styles.button,
          backgroundColor: isTextChanged
            ? theme.colors.primary
            : theme.colors.surfaceDisabled,
        }}
        disabled={!isTextChanged}>
        <Text
          style={{
            color: isTextChanged
              ? theme.colors.onPrimary
              : theme.colors.onSurfaceDisabled,
          }}>
          {' '}
          {/* {editMode ? 'Save' : 'Edit'} */}
          Update
        </Text>
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
