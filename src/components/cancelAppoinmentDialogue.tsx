import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Provider,
  Text,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../styles';
import {removeFromAppoinmentListRequested} from '../redux/silces/userdata.slice';
import {RootState} from '../redux';
import {useNavigation} from '@react-navigation/native';
interface ILogInDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
}

const CancelAppointmentDialog = (props: ILogInDialogProps) => {
  const theme = useTheme();

  const appoinMentId = useSelector(
    (state: RootState) =>
      state.userdata.currentAppointmentDetails.data?.appointmentId,
  );

  const dispatch = useDispatch();
  const {visible, setVisible} = props;
  const navigation = useNavigation<any>();

  const hideDialog = () => {
    dispatch(removeFromAppoinmentListRequested(appoinMentId ?? '')),
      setVisible(false);
    navigation.navigate('appointmentlist');
  };

  return (
    <View style={{zIndex: 1000}}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{backgroundColor: theme.colors.surface}}>
          <Dialog.Title>
            <Text variant="titleMedium" style={{color: theme.colors.onSurface}}>
              Cancel Appointment
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{color: theme.colors.onSurface}}>
              Are you sure you want to cancel this appointment ?
            </Text>
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
                No
              </Button>
              <Button
                style={{borderRadius: 5, padding: 2}}
                mode="contained"
                // style={{backgroundColor: colors.primaryColor}}
                onPress={hideDialog}>
                Yes
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CancelAppointmentDialog;
