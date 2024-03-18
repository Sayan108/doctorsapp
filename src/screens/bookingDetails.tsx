import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Layout from '../components/layOut';
import {colors} from '../styles';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface Payment {
  method: string;
  total: number;
}

interface BookingDetailsProps {
  customer: Customer;
  product: Product;
  payment: Payment;
}

const BookingDetails = ({navigation, route}: {navigation: any; route: any}) => {
  const {id} = route.params;
  const data = useSelector((state: RootState) => state.userdata.appoinmentForm);
  const customer = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
  };
  const product = {
    name: '1234567890',
    price: '12/12/2024',
    quantity: '12.12 PM',
  };
  const payment = {id: '1234567890', method: 'Credit Card', total: 1000};
  const handleNavigation = () => {
    navigation.navigate(id === -1 ? 'chooseclinic' : 'chooseclinic', {id: id});
  };
  return (
    <Layout headerText="Booking details" navigation={handleNavigation}>
      <View style={styles.container}>
        <Text style={styles.sectionHeading}>Patient Details</Text>
        <View style={styles.section}>
          <Text style={styles.sectionDetails}>Name: {data?.patientName}</Text>

          <Text style={styles.sectionDetails}>Phone: {data?.patientPhone}</Text>
        </View>
        <Text style={styles.sectionHeading}>Booking Details</Text>
        <View style={styles.section}>
          <Text style={styles.sectionDetails}>Booking id: {'12345678'}</Text>
          <Text style={styles.sectionDetails}>
            Date: {data?.appoinmentDate}
          </Text>
          <Text style={styles.sectionDetails}>
            Time: {data?.appoinmentTime}
          </Text>
        </View>
        <Text style={styles.sectionHeading}>Payment Details</Text>
        <View style={styles.section}>
          <Text style={styles.sectionDetails}>
            Payment id: {data?.paymentDetails?.paymentId}
          </Text>
          <Text style={styles.sectionDetails}>
            Payment Method: {data?.paymentDetails?.paymentType}
          </Text>
          <Text style={styles.sectionDetails}>
            Total Amount: {data?.paymentDetails?.ammount}
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(id === -1 ? 'appoinmentsuccess' : 'home');
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Next
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.textColor,
  },
  section: {
    width: 'auto',
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'rgba(245, 71, 73, 0.08)',
    padding: 10,
    borderColor: colors.primaryColor,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.textColor,
  },
  sectionDetails: {
    fontSize: 14,

    marginBottom: 8,
    color: colors.textColor,
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

export default BookingDetails;
