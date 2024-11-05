import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  List,
  Button,
  useTheme,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import CancelAppointmentDialog from '../../components/cancelAppoinmentDialogue';
import Layout from '../../components/layOut';
import MarkAsDoneDialog from '../../components/markAsDoneDialog';
import {RootState} from '../../redux';
import {colors} from '../../styles';
import {Text} from 'react-native-paper';
import {formatDateString, parseJSONOBJ} from '../../util/funtions.util';
import {StackActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IUpdateAppointment} from '../../redux/constants/appointment.constant';
import {AppointmentStatus, AppointmentStatusText} from '../../config/enum';
import {updateAppointmentRequested} from '../../redux/silces/userdata.slice';
import {availableSlotsRequested} from '../../redux/silces/clinic.slice';
import {theme as newTheme} from '../../theme/theme';

interface modalSate {
  isOpen: boolean;
  text: string;
}
const AppointmentDetails = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isLoading = useSelector(
    (state: RootState) => state.userdata.currentAppointmentDetails.loading,
  );

  const [visible, setvisible] = useState<boolean>(false);
  const [showCancelModal, setshowCancelModal] = useState<boolean>(false);
  const [showMarkAssDoneModal, setshowMarkAssDoneModal] = useState(false);
  const {id} = route.params;

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  const {data} = useSelector(
    (state: RootState) => state.userdata.currentAppointmentDetails,
  );

  const comment = parseJSONOBJ(data?.comment ?? '') ?? {};
  console.log(comment, 'getting comment');

  //data, 'appoinment details');

  const handleReschedulteClick = (id: any) => {
    dispatch(availableSlotsRequested(id));
    navigation.navigate('reschedule');
  };

  return (
    <Layout>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{marginTop: '50%', marginHorizontal: 10}}
        />
      ) : (
        //body
        <View style={{display: 'flex', flex: 1}}>
          {/* cancel modal */}
          {showCancelModal ? (
            <CancelAppointmentDialog
              visible={showCancelModal}
              setVisible={setshowCancelModal}
            />
          ) : showMarkAssDoneModal ? (
            <MarkAsDoneDialog
              visible={showMarkAssDoneModal}
              setVisible={setshowMarkAssDoneModal}
            />
          ) : (
            <View style={{display: 'flex', flex: 1}}>
              <ScrollView>
                <View
                  style={[
                    styles.container,
                    {backgroundColor: theme.colors.surface},
                  ]}>
                  {/* patient details text and three dots */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      // borderWidth: 1,
                      // borderColor: theme.colors.onSurface,
                      // justifyContent: 'center',

                      paddingLeft: 6,
                    }}>
                    <Text
                      variant="titleMedium"
                      style={{
                        color: theme.colors.onSurface,
                      }}>
                      Patient Details
                    </Text>
                    {data?.status === 0 ? (
                      <Pressable
                        style={{marginLeft: '55%', justifyContent: 'flex-end'}}
                        onPress={() => {
                          setvisible(!visible);
                        }}>
                        <Icon
                          name="dots-vertical"
                          color={theme.colors.onSurfaceVariant}
                          size={30}
                          style={[{color: theme.colors.onSurfaceVariant}]}
                        />
                      </Pressable>
                    ) : null}

                    {visible ? (
                      <Surface
                        style={[
                          styles.cancelButton,
                          {
                            backgroundColor: theme.colors.surfaceVariant,
                            shadowColor: theme.colors.shadow,
                          },
                        ]}>
                        <List.Section>
                          <List.Item
                            title="Cancel"
                            titleStyle={{
                              color: theme.colors.onSurfaceVariant,
                            }}
                            left={() => (
                              <Icon
                                // style={{paddingLeft: 10}}
                                name="cancel"
                                size={24}
                                color={theme.colors.onSecondary}
                              />
                            )}
                            onPress={() => {
                              setshowCancelModal(true);
                              setvisible(!visible);
                            }}
                          />
                        </List.Section>
                      </Surface>
                    ) : null}
                  </View>

                  {/* patient details section */}
                  <View
                    style={[
                      styles.section,
                      {backgroundColor: theme.colors.surfaceVariant},
                    ]}>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Name:
                      </Text>
                      {data?.patientData.fullname}
                    </Text>
                    {/* <Text style={styles.sectionDetails}>Email: {data.email}</Text> */}
                    {data?.patientData?.phoneNumber && (
                      <Text
                        variant="bodyMedium"
                        style={{color: theme.colors.onSurfaceVariant}}>
                        <Text
                          variant="bodyMedium"
                          style={{
                            color: theme.colors.onSurfaceVariant,
                            fontWeight: 'bold',
                          }}>
                          Phone :
                        </Text>
                        {data?.patientData?.phoneNumber}
                      </Text>
                    )}
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Gender:
                      </Text>
                      {data?.patientData.gender}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Age:
                      </Text>
                      {data?.patientData.age}
                    </Text>
                  </View>

                  {/* booking details */}
                  <Text
                    variant="titleMedium"
                    style={{
                      color: theme.colors.onSurface,
                      marginLeft: 10,
                    }}>
                    Appointment Details
                  </Text>

                  <View
                    style={[
                      styles.section,
                      {backgroundColor: theme.colors.surfaceVariant},
                    ]}>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Appointment number:
                      </Text>
                      {data?.appointmentNumber}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Clinic name:
                      </Text>
                      {`${data?.clinicData?.clinicName}`}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Clinic address:
                      </Text>

                      {`${data?.clinicData?.address?.address} , ${data?.clinicData?.address?.city}`}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Date:
                      </Text>
                      {formatDateString(
                        data?.bookingDate ? data.bookingDate : '',
                      )}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{color: theme.colors.onSurfaceVariant}}>
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: theme.colors.onSurfaceVariant,
                          fontWeight: 'bold',
                        }}>
                        Time:
                      </Text>{' '}
                      {data?.checkupHour}
                    </Text>
                  </View>
                  {data?.problems && (
                    <>
                      <Text
                        variant="titleMedium"
                        style={{
                          color: theme.colors.onSurface,
                          marginLeft: 10,
                        }}>
                        Symptoms:
                      </Text>
                      <View
                        style={[
                          styles.section,
                          {backgroundColor: theme.colors.surfaceVariant},
                        ]}>
                        <Text
                          variant="bodyMedium"
                          style={{color: theme.colors.onSurfaceVariant}}>
                          {data?.problems}
                        </Text>
                      </View>
                    </>
                  )}
                  {/* {Object.keys(comment)?.length > 0 &&
                    (comment?.symptoms?.length > 0 ||
                      comment?.vitals?.length > 0 ||
                      comment?.medications?.length > 0 ||
                      comment?.suggestions?.length > 0) && (
                      <ScrollView style={{marginVertical: 10}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 10,
                          }}>
                          Doctor's Comment
                        </Text>

                        <View
                          style={[
                            styles.section,
                            {backgroundColor: theme.colors.surfaceVariant},
                          ]}>
                          {comment?.symptoms &&
                            comment?.symptoms?.length > 0 && (
                              <View style={{}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                  }}>
                                  Symptoms
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.symptoms}
                                </Text>
                              </View>
                            )}
                          {comment?.vitals && comment?.vitals?.length > 0 && (
                            <View style={{}}>
                              <Text
                                variant="bodyMedium"
                                style={{
                                  color: theme.colors.onSurfaceVariant,
                                  fontWeight: 'bold',
                                }}>
                                Vitals
                              </Text>
                              <Text
                                variant="bodyMedium"
                                style={{color: theme.colors.onSurfaceVariant}}>
                                {comment?.vitals}
                              </Text>
                            </View>
                          )}
                          {comment?.medications &&
                            comment?.medications?.length > 0 && (
                              <View style={{}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                  }}>
                                  Medications
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.medications}
                                </Text>
                              </View>
                            )}
                          {comment?.suggestions &&
                            comment?.suggestions?.length > 0 && (
                              <View style={{}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                  }}>
                                  Suggestions
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.suggestions}
                                </Text>
                              </View>
                            )}
                        </View>
                      </ScrollView>
                    )} */}

                  {Object.keys(comment)?.length > 0 &&
                    (comment?.symptoms?.length > 0 ||
                      comment?.vitals?.length > 0 ||
                      comment?.medications?.length > 0 ||
                      comment?.suggestions?.length > 0) && (
                      <ScrollView style={{marginVertical: 10}}>
                        <Text
                          variant="titleMedium"
                          style={{
                            color: theme.colors.onSurface,
                            marginLeft: 10,
                            marginBottom: 10,
                          }}>
                          Doctor's Comment
                        </Text>

                        <View
                          style={[
                            styles.section,
                            {backgroundColor: theme.colors.surfaceVariant},
                          ]}>
                          {comment?.symptoms &&
                            comment?.symptoms?.length > 0 && (
                              <View style={{marginBottom: 8}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                    marginBottom: 4,
                                  }}>
                                  Symptoms
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.symptoms}
                                </Text>
                              </View>
                            )}
                          {comment?.vitals && comment?.vitals?.length > 0 && (
                            <View style={{marginBottom: 8}}>
                              <Text
                                variant="bodyMedium"
                                style={{
                                  color: theme.colors.onSurfaceVariant,
                                  fontWeight: 'bold',
                                  marginBottom: 4,
                                }}>
                                Vitals
                              </Text>
                              <Text
                                variant="bodyMedium"
                                style={{
                                  color: theme.colors.onSurfaceVariant,
                                }}>
                                {comment?.vitals}
                              </Text>
                            </View>
                          )}
                          {comment?.medications &&
                            comment?.medications?.length > 0 && (
                              <View style={{marginBottom: 8}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                    marginBottom: 4,
                                  }}>
                                  Medications
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.medications}
                                </Text>
                              </View>
                            )}
                          {comment?.suggestions &&
                            comment?.suggestions?.length > 0 && (
                              <View style={{marginBottom: 8}}>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                    fontWeight: 'bold',
                                    marginBottom: 4,
                                  }}>
                                  Suggestions
                                </Text>
                                <Text
                                  variant="bodyMedium"
                                  style={{
                                    color: theme.colors.onSurfaceVariant,
                                  }}>
                                  {comment?.suggestions}
                                </Text>
                              </View>
                            )}
                        </View>
                      </ScrollView>
                    )}

                  <Text
                    variant="titleMedium"
                    style={{
                      color: theme.colors.onSurface,
                      marginLeft: 10,
                    }}>
                    Appointment Status
                  </Text>
                  <View
                    style={[
                      styles.section,
                      {backgroundColor: theme.colors.surfaceVariant},
                    ]}>
                    <View
                      style={{
                        backgroundColor:
                          data?.status === AppointmentStatus.Upcoming
                            ? newTheme.colors.statusUpcoming
                            : data?.status === AppointmentStatus.Completed
                            ? newTheme.colors.success
                            : data?.status === AppointmentStatus.Cancelled
                            ? newTheme.colors.error
                            : 'transparent',
                        padding: 4,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color:
                            data?.status === AppointmentStatus.Upcoming
                              ? newTheme.colors.onStatusUpcoming
                              : data?.status === AppointmentStatus.Completed
                              ? newTheme?.colors.onSuccess
                              : data?.status === AppointmentStatus.Cancelled
                              ? newTheme.colors.onError
                              : 'transparent',
                        }}
                        variant="bodySmall">
                        {AppointmentStatusText[data?.status ?? 0]}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              {/* buttons */}
              {data?.status === 0 ? (
                <View
                  style={[
                    styles.buttonContainer,
                    {backgroundColor: theme.colors.surface},
                  ]}>
                  <Button
                    style={{
                      backgroundColor: theme.colors.primary,
                      padding: 6,
                      borderRadius: 4,
                    }}
                    mode="contained"
                    onPress={() => {
                      setshowMarkAssDoneModal(true);
                      // handelMarkAsDone()
                    }}
                    // style={[styles.button]}
                  >
                    Mark as done
                  </Button>
                  <Button
                    style={{
                      borderRadius: 4,
                      padding: 6,
                    }}
                    mode="outlined"
                    onPress={() => {
                      handleReschedulteClick(data.clinicId);
                    }}
                    // style={styles.buttonOutline}
                  >
                    Reschedule
                  </Button>
                </View>
              ) : null}
            </View>
          )}
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  cancelButton: {
    display: 'flex',
    position: 'absolute',
    top: 60, // Adjust as needed
    left: '50%',
    right: 0,
    zIndex: 10, // Ensure the menu is above other elements
    // elevation: 400,
    width: '50%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  section: {
    width: 'auto',
    borderRadius: 10,
    margin: 12,
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
  },
  buttonOutline: {
    marginTop: 24,
  },

  textBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
  },

  buttonContainer: {
    display: 'flex',
    gap: 24,
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default AppointmentDetails;
