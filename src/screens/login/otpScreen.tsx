import {View, Image, TextInput, StyleSheet} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import {colors, style} from '../../styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';

import useAuthService from '../../hooks/useAuthServices';
import Timer from '../../components/otpTimer';
import OtpPageIcon from '../../asset/icons/otpPageIcon';

const OTPInputScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();

  const {handleLogIn} = useAuthService();
  const timerValue = 60;
  const length = 4;
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userDetails?.phoneNumber,
  );

  const inputRefs = useRef<TextInput[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      otp[index] = '';
    }
  };
  const handleLoginButtonClick = () => {
    let finalOtp = '';
    for (let i = 0; i < otp.length; i++) {
      finalOtp = finalOtp + otp[i];
    }

    handleLogIn(finalOtp, navigation);
  };
  return (
    <View style={[style.view, {backgroundColor: theme.colors.surface}]}>
      <View style={style.headerView}>
        <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
          Log in
        </Text>
      </View>

      {/* <Image
        style={style.loginPageImage}
        source={require('./OTPInput.png')}></Image> */}
        <View>
          <OtpPageIcon/>
        </View>

      <View style={style.loginPageTextContainer}>

        {/* other text and textbox */}
        <View style={style.loginPageTextContainer}>
          <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
            OTP Verification
          </Text>

          <Text variant="bodyMedium" style={{color: theme.colors.onSurface}}>
            {`We have sent you a verification code in your mobile no ${phoneNumber}`}
          </Text>
        </View>

        <View>
          {/* <TextInput
            keyboardType="phone-pad"
            maxLength={4}
            autoFocus
            value={OTP}
            label="OTP"
            mode="outlined"
            activeOutlineColor={colors.primaryColor}
            onChangeText={handleOTPChange}
            placeholder="0000"
            placeholderTextColor="gray"></TextInput> */}
          <View style={styles.container}>
            {Array(length)
              .fill(null)
              .map((_, index) => (
                <TextInput
                  selectionColor={theme.colors.primary}
                  autoFocus={index === 0}
                  key={index}
                  style={[
                    styles.input,
                    {borderBottomColor: theme.colors.primary},
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={text => handleChangeText(text, index)}
                  value={otp[index]}
                  ref={ref => (inputRefs.current[index] = ref as TextInput)}
                  onKeyPress={event => handleKeyPress(event, index)}
                />
              ))}
          </View>

          <View style={{paddingTop: 10}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text variant="bodySmall" style={{color: theme.colors.onSurface}}>
                {/* style={{
                  color: colors.textColor,
                  justifyContent: 'space-between',
                }}> */}
                Didn't recieve the code?
              </Text>

              <Timer initialSeconds={timerValue} navigation={navigation} />
            </View>
            <Button
              aria-disabled
              mode="text"
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('phoneinput')}>
              Change number
            </Button>
          </View>

          <View style={{paddingTop: 50}}>
            <Button
              style={{
                backgroundColor: theme.colors.primary,
                padding: 6,
                borderRadius: 4,
              }}
              mode="contained"
              onPress={handleLoginButtonClick}>
              Get OTP
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 45,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    margin: 5,
    marginTop:20,
    // borderBottomColor: 'black',
    borderBottomWidth: 1,
    // color: 'black',
  },
});
export default OTPInputScreen;
