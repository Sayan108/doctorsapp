import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Layout from '../components/layOut';
import {Button, RadioButton} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {colors} from '../styles';

const ClinicLocation = ({navigation, route}: {navigation: any; route: any}) => {
  const [checked, setChecked] = React.useState(1);
  const {id} = route.params;
  const place = [
    {
      id: 1,
      address: {
        lineOne: 'ABC Building ',
        lineTwo: 'Saltlake ,Sector V',
        lineThree: 'Kol -700091',
        lineFour: 'Near Ecospae building',
      },
    },

    {
      id: 2,
      address: {
        lineOne: 'ABC Building ',
        lineTwo: 'Saltlake ,Sector V',
        lineThree: 'Kol -700091',
        lineFour: 'Near Ecospae building',
      },
    },
    {
      id: 3,
      address: {
        lineOne: 'ABC Building ',
        lineTwo: 'Saltlake ,Sector V',
        lineThree: 'Kol -700091',
        lineFour: 'Near Ecospae building',
      },
    },
    {
      id: 4,
      address: {
        lineOne: 'ABC Building ',
        lineTwo: 'Saltlake ,Sector V',
        lineThree: 'Kol -700091',
        lineFour: 'Near Ecospae building',
      },
    },
    {
      id: 5,
      address: {
        lineOne: 'ABC Building ',
        lineTwo: 'Saltlake ,Sector V',
        lineThree: 'Kol -700091',
        lineFour: 'Near Ecospae building',
      },
    },
  ];
  const handleNavigation = () => {
    navigation.navigate(id === -1 ? 'addappoinment' : 'appoinmentdetails', {
      id: id,
    });
  };
  return (
    <Layout headerText="Choose clinic" navigation={handleNavigation}>
      <ScrollView>
        {place.map((item: any, index: number) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContainer}>
              <Text style={styles.addressHeader}>{item.address.lineOne}</Text>
              <Text style={styles.address}>{item.address.lineTwo}</Text>
              <Text style={styles.address}>{item.address.lineThree}</Text>
              <Text style={styles.address}>{item.address.lineFour}</Text>
            </View>
            <RadioButton
              status={item.id === checked ? 'checked' : 'unchecked'}
              color={'red'}
              value={item.id}
              onPress={() => {
                setChecked(item.id);
              }}></RadioButton>
            <View style={styles.radioButtonContainer}></View>
          </View>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(
            id === -1 ? 'choosedateandtime' : 'choosedateandtime',
            {
              id: id,
            },
          );
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Next
      </Button>
    </Layout>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    color: '#333',
  },
  addressHeader: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
  radioButtonContainer: {
    justifyContent: 'center',
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
export default ClinicLocation;
