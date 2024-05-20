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
import {useDispatch} from 'react-redux';
import {colors} from '../styles';
interface ILogInDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
}

const CancelAppointmentDialog = (props: ILogInDialogProps) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const {visible, setVisible} = props;

  const hideDialog = () => setVisible(false);

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
