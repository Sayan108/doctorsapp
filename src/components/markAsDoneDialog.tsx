import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Provider, Text, TextInput, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../styles';
import { RootState } from '../redux';
import { updateAppointmentRequested } from '../redux/silces/userdata.slice';
import { AppointmentStatus } from '../config/enum';
import { IUpdateAppointment } from '../redux/constants/appointment.constant';
interface ILogInDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
}

const MarkAsDoneDialog = (props: ILogInDialogProps) => {

  const {data} = useSelector(
    (state: RootState) => state.userdata.currentAppointmentDetails,
  );

  const handelMarkAsDone = ()=>{
    const payload:IUpdateAppointment = {
      appointmentId: data?.appointmentId?data.appointmentId:'',
      status:AppointmentStatus.Completed
    }

    dispatch(updateAppointmentRequested(payload));
  }
  
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
            <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
              Take a note
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            {/* <Text variant="bodyMedium" style={{color: theme.colors.onSurface}}>
              Are you sure you want to cancel this appointment ?
            </Text> */}
            <TextInput
              placeholder='write here'
            >

            </TextInput>
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
                onPress={()=>{
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

export default MarkAsDoneDialog;
