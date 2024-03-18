import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import React, {useState} from 'react';
import {colors, style} from '../styles';
import useAuthService, {sendOTPPayload} from '../hooks/useAuthServices';
import {phoneNumberRegex} from '../regex.config';
import HelperText from '../components/helperText';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const PhoneInputScreen = ({navigation}: {navigation: any}) => {
  const {handleSendOTP} = useAuthService();
  const userData = useSelector((state: RootState) => state.userdata);
  const [phoneNumber, setphoneNumber] = useState<string>('');
  const [validNumber, setvalidNumber] = useState<boolean>(false);
  const handlePhoneNumberChange = (text: string) => {
    setphoneNumber(text);
  };

  const handleSendOTPButtonClick = () => {
    if (phoneNumber.length === 10) {
      const payload: sendOTPPayload = {phoneNumber};
      handleSendOTP(payload, navigation);
    } else {
      setvalidNumber(phoneNumber.length > 0 && phoneNumber.length < 10);
    }
  };
  return (
    <View style={style.view}>
      <View style={style.headerView}>
        <Text style={style.loginPageHeader}>Log in</Text>
      </View>

      <Image
        style={style.loginPageImage}
        source={require('./phoneNumberInput.png')}></Image>

      <View style={style.loginPageTextContainer}>
        <Text style={style.loginPageTextPrimary}>Let's get started</Text>
        <Text style={style.loginPageTextSecondary}>
          An OTP will be sent to verify the mobile number
        </Text>
        <View style={{marginTop: 10}}>
          <TextInput
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
            autoComplete="tel"
            value={phoneNumber}
            label="Mobile number"
            mode="outlined"
            activeOutlineColor={colors.primaryColor}
            onChangeText={handlePhoneNumberChange}
            placeholder="1234567890"
            placeholderTextColor="gray"></TextInput>
          <HelperText
            show={validNumber}
            text="Enter valid number"
            type="error"
          />
          <View style={{paddingTop: 100}}>
            <Button
              style={{backgroundColor: colors.primaryColor}}
              mode="contained"
              onPress={handleSendOTPButtonClick}>
              Get OTP
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhoneInputScreen;
