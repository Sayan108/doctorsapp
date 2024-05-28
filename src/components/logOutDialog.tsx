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
import {logOut} from '../redux/silces/auth.silce';
import {colors} from '../styles';
import {clearUserData} from '../redux/silces/userdata.slice';
import {RootState} from '../redux';
import useAuthService from '../hooks/useAuthServices';
interface ILogInDialogProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation:any
}

const LogoutDialogue = (props: ILogInDialogProps) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const {handleLogOut} = useAuthService();
  const {visible, setVisible} = props;
  const userData = useSelector((state: RootState) => state.userdata);
  const hideDialog = () => setVisible(false);

  const handleYesPress = () =>{
    hideDialog();
    handleLogOut();
    props.navigation.navigate('phoneinput');
  }

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
                Log out
              </Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.onSurface}}>
                Are you sure you want to log out ?
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
                  onPress={handleYesPress}>
                  Yes
                </Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default LogoutDialogue;
