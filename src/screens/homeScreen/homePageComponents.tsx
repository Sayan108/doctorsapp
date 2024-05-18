import {View, Image, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Appbar, List, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import AppointmentCard from './appoinmentCard';
import {Text} from 'react-native-paper';
import LogoutDialoge from '../../components/logOutDialogue';
import {theme} from '../../theme/theme';
import AppointmentOverView from './appoinmentOverView';

const {height: screenHeight} = Dimensions.get('window');

const HomePageComponent = (props: any) => {
  const {setIndex, navigation} = props;
  // const dispatch = useDispatch();

  const [visible, setvisible] = useState<boolean>(false);
  const [showLogout, setshowLogout] = useState<boolean>(false);
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        {/* appbar */}
        <Appbar.Header>
          <Icon
            name="account-circle-outline"
            size={35}
            color={colors.primaryColor}
            onPress={() => {
              setvisible(!visible);
            }}
          />
        </Appbar.Header>

        {visible ? (
          <View
            style={{
              position: 'absolute',
              top: 60, // Adjust as needed
              left: 10,
              right: 0,
              backgroundColor: 'rgba(255,255 ,255 ,1)',
              zIndex: 10, // Ensure the menu is above other elements
              elevation: 400,
              width: '60%',
              borderRadius: 25,
            }}>
            <List.Section>
              <List.Item
                title="My profile"
                titleStyle={{
                  color: 'black', // Text color
                }}
                left={() => (
                  <Icon
                    style={{paddingLeft: 10}}
                    name="account-circle-outline"
                    size={35}
                    color={colors.textColor}
                  />
                )}
                onPress={() => {
                  navigation.navigate('myprofile');
                  setvisible(!visible);
                }}
              />

              <List.Item
                title="Log out"
                titleStyle={{
                  color: 'black', // Text color
                }}
                left={() => (
                  <Icon
                    style={{paddingLeft: 10}}
                    name="logout"
                    size={35}
                    color={colors.textColor}
                  />
                )}
                onPress={() => {
                  setshowLogout(true);
                  setvisible(false);
                }}
              />
            </List.Section>
          </View>
        ) : null}

        {/* appointment Overview, upcoming Appointment */}
        {showLogout ? (
          <LogoutDialoge visible={showLogout} setVisible={setshowLogout} />
        ) : (
          <>
            {/* Appointment overview section */}
            <View style={styles.section}>
              <Text variant="headlineSmall" style={styles.sectionTitle}>
                Appointment overview
              </Text>
              <AppointmentOverView navigation={navigation} />
            </View>

            {/* Upcoming appointment section */}
            <View style={styles.section}>
              {/* Upcoming appointment text and see all button */}
              <View style={styles.header}>
                <Text variant="headlineSmall" style={styles.sectionTitle}>
                  Upcoming appointments
                </Text>

                <Text
                  variant="bodySmall"
                  style={styles.seeAllButton}
                  onPress={() => setIndex(1)}>
                  See all
                </Text>
              </View>

              <AppointmentCard navigation={navigation} />
            </View>
          </>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    borderColor: 'green',
    height: '100%',
    padding: 12, // Add padding to the container if needed
    gap: 20,
    // justifyContent:'space-between',
  },
  section: {
    display: 'flex',
    height: 'auto',

    flex: 1,
  },
  sectionTitle: {
    color: colors.textColor,
    fontSize: 18,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between the text elements
    alignItems: 'center',
    width: '100%',
  },
  seeAllButton: {
    color: colors.primaryColor,
    fontSize: 16,
  },
});
export default HomePageComponent;
