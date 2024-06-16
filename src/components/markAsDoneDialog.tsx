import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../styles';
import {RootState} from '../redux';
import {updateAppointmentRequested} from '../redux/silces/userdata.slice';
import {AppointmentStatus} from '../config/enum';
import {IUpdateAppointment} from '../redux/constants/appointment.constant';
interface ILogInDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
}

const MarkAsDoneDialog = (props: ILogInDialogProps) => {
  const {data} = useSelector(
    (state: RootState) => state.userdata.currentAppointmentDetails,
  );

  const [formData, setFormData] = React.useState({
    symptoms: '',
    vitals: '',
    medications: '',
    suggestions: '',
  });

  // Handler for text input changes
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelMarkAsDone = () => {
    const payload: IUpdateAppointment = {
      appointmentId: data?.appointmentId ? data.appointmentId : '',
      status: AppointmentStatus.Completed,
      comment: JSON.stringify(formData),
    };

    dispatch(updateAppointmentRequested(payload));
  };

  const theme = useTheme();

  const dispatch = useDispatch();
  const {visible, setVisible} = props;

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View style={{zIndex: 1000}}>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{backgroundColor: theme.colors.surface}}>
            <Dialog.Title>
              <Text
                variant="titleMedium"
                style={{color: theme.colors.onSurface}}>
                Comments and suggestions
              </Text>
            </Dialog.Title>

            <Dialog.Content>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Symptoms"
                  placeholder="Enter symptoms"
                  mode="outlined"
                  value={formData.symptoms}
                  onChangeText={text => handleInputChange('symptoms', text)}
                  style={styles.input}
                />
                <TextInput
                  label="Vitals"
                  placeholder="Enter vitals"
                  mode="outlined"
                  value={formData.vitals}
                  onChangeText={text => handleInputChange('vitals', text)}
                  style={styles.input}
                />
                <TextInput
                  label="Medications"
                  placeholder="Enter medications"
                  mode="outlined"
                  value={formData.medications}
                  onChangeText={text => handleInputChange('medications', text)}
                  style={styles.input}
                />
                <TextInput
                  label="Suggestions"
                  placeholder="Enter suggestions"
                  mode="outlined"
                  value={formData.suggestions}
                  onChangeText={text => handleInputChange('suggestions', text)}
                  style={styles.input}
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              {/* buttons */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <Button
                  style={{borderRadius: 5, padding: 2}}
                  mode="outlined"
                  onPress={hideDialog}>
                  Cancel
                </Button>
                <Button
                  style={{borderRadius: 5, padding: 2}}
                  mode="contained"
                  // style={{backgroundColor: colors.primaryColor}}
                  onPress={() => {
                    hideDialog();
                    handelMarkAsDone();
                  }}>
                  Done
                </Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
  },
  input: {
    marginBottom: 16,
  },
});

export default MarkAsDoneDialog;
