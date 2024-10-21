import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getClinicList} from '../../services/clinic/clinic.service';
import {IClinicDetails} from '../../redux/constants/clinic.constant';
import {
  availableSlotsRequested,
  clinicDetailsSuccess,
  clinicListRequested,
} from '../../redux/silces/clinic.slice';
import {RootState} from '../../redux';
import {patientListRequested} from '../../redux/silces/patient.slice';
import {upDateClinic} from '../../redux/silces/appointment.slice';
import {FAB, Provider as PaperProvider} from 'react-native-paper';
import {theme} from '../../theme/theme';
import { defaultDoctorId } from '../../services/constants';

export const ClinicList = () => {
  const selectedClinicId: any = useSelector(
    (state: RootState) => state.newAppointmentData.clinicId,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const doctorDetails = useSelector((state: RootState) => state.doctorsData);

  const clinicList = useSelector(
    (state: RootState) => state.clinicData.ClinicList.data,
  );
  const isLoading = useSelector(
    (state: RootState) => state.clinicData.ClinicList.isLoading,
  );

  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0);
  useEffect(() => {
    const params = {doctorId: defaultDoctorId};
    dispatch(clinicListRequested(params));
  }, []);
  return (
    <PaperProvider theme={theme}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          <Text style={styles.title}>Clinic List</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {clinicList?.map((item, index) => (
              <View key={index} style={styles.clinicContainer}>
                <View style={styles.clinicDetails}>
                  <Text variant='titleMedium' >{item.clinicName}</Text>
                  <Text variant='bodyMedium'>{item?.address?.address}</Text>
                  <Text>{item?.address?.city}</Text>
                  <Text>{item?.address?.pincode}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  clinicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  clinicDetails: {
    flexDirection: 'column',
  },
  clinicName: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
