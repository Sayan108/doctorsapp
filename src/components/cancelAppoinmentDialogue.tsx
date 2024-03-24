import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/silces/auth.silce';
import {colors} from '../styles';
interface ILogInDialogeProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelAppoinmentDialoge = (props: ILogInDialogeProps) => {
  const dispatch = useDispatch();
  const {visible, setVisible} = props;

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={{zIndex: 1000}}>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{backgroundColor: 'white'}}>
            <Dialog.Title>
              <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                Cancel Appoinment
              </Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                Are you sure you want to cancel this appoinment ?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
                  No
                </Text>
              </Button>
              <Button
                style={{backgroundColor: colors.primaryColor}}
                onPress={hideDialog}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                    padding: 5,
                  }}>
                  Yes
                </Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default CancelAppoinmentDialoge;
