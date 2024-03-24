import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../components/layOut';
import {colors} from '../styles';

const AboutDoctor = ({navigation}: {navigation: any}) => {
  const handleNavigation = () => {
    navigation.navigate('home');
  };
  return (
    <Layout navigation={handleNavigation} headerText="About doctor">
      <ScrollView>
        <Image source={require('./debabrata-bera.webp')} style={styles.image} />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Dr. Debabrata Bera is a highly skilled cardiologist with over 16
              years of experience. He currently serves at Rabindranath Tagore
              International Institute Of Cardiac Sciences, where he specializes
              in various cardiac interventions. Dr. Bera's expertise includes
              Pacemaker implantation, ICD and CRT implantation, Arrhythmia
              management, Balloon Mitral Valvuloplasty, and Coronary Angiogram
              and Angioplasty. With a strong educational background including
              degrees from Calcutta University and specializations in
              Cardiology, Dr. Bera is renowned for his precise diagnosis and
              empathetic patient care. He is particularly adept at handling
              complex medical cases, demonstrating attention to detail in his
              treatment approach. Dr. Bera's professional journey includes
              notable roles as a Consultant at NH Rabindranath Tagore
              International Institute Of Cardiac Sciences and Apollo Glenaegles
              Hospitals, Kolkata. He has contributed significantly to the field
              of cardiology and is sought after for priority appointments due to
              his expertise and commitment to providing a hassle-free medical
              experience. Specializations: Cardiology Clinical Cardiac
              Electrophysiology Education & Achievements: MBBS from Calcutta
              University MD in Paediatric DM and DNB in Cardiology Fellowship in
              Electro Physiology Treatments: Angioplasty (PTCA) Coronary
              Angiogram CT Coronary Angiography
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,

    flexWrap: 'wrap',
  },

  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  imageCaption: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    borderColor: colors.primaryColor,
    borderWidth: 3,
  },
  text: {
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textColor,
  },
});
export default AboutDoctor;
