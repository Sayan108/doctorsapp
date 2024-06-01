import {StyleSheet} from 'react-native';
import React, {UIEventHandler, useEffect, useState} from 'react';
import Layout from '../../components/layOut';
import {colors} from '../../styles';
import {ActivityIndicator, Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import useAuthService from '../../hooks/useAuthServices';

const MyProfile = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const profileInfo = useSelector((state: RootState) => state.auth.userDetails);
  

  const [profileDetails, setProfileDetails] = useState<{
    fullname: string;
    phoneNumber: string;
  }>({
    fullname: profileInfo?.fullname || '',
    phoneNumber: profileInfo?.phoneNumber || '',
  });

  const [isTextChanged, setTextChange] = useState(false);


  const [originalFullName, setOriginalFullName] = useState(
    profileInfo?.fullname || '',
  );

  const [originalPhoneNumber, setOriginalPhoneNumber] = useState(
    profileInfo?.phoneNumber || '',
  );

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const {handleUserUpdate} = useAuthService();
  const handleButtonPressed = ()=>{
    setTextChange(!isTextChanged);
    handleUserUpdate({...profileDetails, userId:profileInfo?.userID});
  }

  useEffect(() => {
    console.log('profileDetails', profileDetails);
    if (
      profileDetails.fullname.length === 0 ||
      profileDetails.phoneNumber.length === 0
    ) {
      setTextChange(false);
    } else if (
      originalFullName !== profileDetails.fullname ||
      originalPhoneNumber !== profileDetails.phoneNumber
    ) {
      setOriginalFullName(profileDetails.fullname);
      setOriginalPhoneNumber(profileDetails.phoneNumber);
      setTextChange(true);
    }
  }, [profileDetails]);

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
          value={profileDetails?.fullname}
          label="Full name"
          mode="outlined"
          onChangeText={(text: string) => {
            setProfileDetails({...profileDetails, fullname: text});
          }}
          placeholder="Jhon Doe"
        />

        <TextInput
          maxLength={10}
          value={profileDetails?.phoneNumber}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setProfileDetails({...profileDetails, phoneNumber: text});
          }}
          placeholder="1234567890"
          keyboardType="phone-pad"
        />
      </SafeAreaView>
      <Button
        mode="contained"
        onPress={handleButtonPressed}
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
         {isLoading ? (
                <ActivityIndicator size="small" color={theme.colors.onPrimary} />
              ) : (
                'Update'
              )}
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

