import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import {colors, style} from '../styles';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

import useAuthService from '../hooks/useAuthServices';
import Timer from '../components/otpTimer';

const OTPInputScreen = ({navigation}: {navigation: any}) => {
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
    <View style={style.view}>
      <View style={style.headerView}>
        <Text style={style.loginPageHeader}>Log in</Text>
      </View>

      <Image
        style={style.loginPageImage}
        source={require('./OTPInput.png')}></Image>

      <View style={style.loginPageTextContainer}>
        <Text style={style.loginPageTextPrimary}>OTP Verification</Text>
        <Text style={style.loginPageTextSecondary}>
          {`We have sent you a verification code in your mobile no ${phoneNumber}`}
        </Text>
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
                  selectionColor={colors.primaryColor}
                  autoFocus={index === 0}
                  key={index}
                  style={styles.input}
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
              <Text
                style={{
                  color: colors.textColor,
                  justifyContent: 'space-between',
                }}>
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
              style={{backgroundColor: colors.primaryColor}}
              mode="contained"
              onPress={handleLoginButtonClick}>
              Login
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
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'black',
  },
});
export default OTPInputScreen;
