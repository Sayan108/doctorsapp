import {View, StyleSheet, Image} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';

import React, {useState} from 'react';
import {colors, style} from '../styles';
import useAuthService, {sendOTPPayload} from '../hooks/useAuthServices';
import {phoneNumberRegex} from '../regex.config';
import HelperText from '../components/helperText';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const PhoneInputScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

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
    <View style={[style.view, {backgroundColor: theme.colors.surface}]}>
      {/* login text */}
      <View style={style.headerView}>
        <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
          Log in
        </Text>
      </View>

      {/* doctor icon */}
      <Image
        style={style.loginPageImage}
        source={require('./phoneNumberInput.png')}></Image>

      {/* other text and textbox */}
      <View style={style.loginPageTextContainer}>
        <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
          Let's get started
        </Text>

        <Text variant="bodyMedium" style={{color: theme.colors.onSurface}}>
          An OTP will be sent to verify the mobile number
        </Text>

        {/* phonenumber input */}
        <View style={{marginTop: 10}}>
          <TextInput
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
            autoComplete="tel"
            value={phoneNumber}
            label="Mobile number"
            mode="outlined"
            activeOutlineColor={theme.colors.primary}
            onChangeText={handlePhoneNumberChange}
            placeholder="1234567890"></TextInput>
          <HelperText
            show={validNumber}
            text="Enter valid number"
            type="error"
          />
          <View style={{paddingTop: 100}}>
            <Button
              style={{
                backgroundColor: theme.colors.primary,
                padding: 6,
                borderRadius: 4,
              }}
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
