import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert, StyleSheet, View, Image, Text, Linking} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import useAuthService from '../../hooks/useAuthServices';
import {RootState} from '../../redux';
import DoctorIcon from '../../asset/icons/doctoricon';
import Layout from '../../components/layOut';
import { style } from '../../styles';

const PasswordLoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const {handleLogIn} = useAuthService();

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }
    const data = {username: email, password};
    handleLogIn(data, navigation);
    navigation.navigate('home');
  };

//   const handleNavigation = () => {
//     navigation.navigate('home');
//   };
  //   const handleRedirectToWebsite = () => {
  //     const url = 'https://www.kediapolymer.co.in'; // Replace with your website's order page URL
  //     Linking.openURL(url);
  //   };

  return (
    <Layout>
    <View style={[style.view, {backgroundColor: theme.colors.surface}]}>
    {/* doctor icon */}
        <View style={{}}>
          <DoctorIcon />
        </View>

        {/* <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          Do you want to know about Kedia Polymer trading product ?
        </Text>
        <Text style={styles.messageText}>
          We sell Astral pipes, Sintex tanks, Berger paints, G.I pipes.
        </Text>
        <Text style={styles.linkText} onPress={handleRedirectToWebsite}>
          For details visit our website.
        </Text>
      </View> */}

        <View style={styles.loginPageTextContainer}>
          <View>
            <TextInput
              maxLength={100}
              value={email}
              label="Username"
              mode="outlined"
              onChangeText={setEmail}
              activeOutlineColor={theme.colors.primary}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={{flex: 1}}
                maxLength={100}
                value={password}
                label="Password"
                mode="outlined"
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                activeOutlineColor={theme.colors.primary}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>
            <View style={{marginTop:50}}>
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.button}>
                {isLoading ? 'Loading...' : 'Login'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: '35%',
    alignSelf: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  headerView: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 16,
  },
  messageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  loginPageTextContainer: {
    width: 300,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});

export default PasswordLoginScreen;
