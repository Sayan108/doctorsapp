import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {colors} from '../styles';

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  navigation: any;
}

const Timer: React.FC<TimerProps> = ({
  initialMinutes = 0,
  initialSeconds = 0,
  navigation,
}) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(true);
  let interval: NodeJS.Timeout;
  useEffect(() => {
    let totalSeconds = minutes * 60 + seconds;

    if (totalSeconds > 0) {
      interval = setInterval(() => {
        totalSeconds--;
        const updatedMinutes = Math.floor(totalSeconds / 60);
        const updatedSeconds = totalSeconds % 60;
        setMinutes(updatedMinutes);
        setSeconds(updatedSeconds);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  return (
    <View style={styles.container}>
      {minutes === 0 && seconds === 0 ? (
        <Text
          style={{
            marginLeft: 10,
            justifyContent: 'space-between',
            color: colors.primaryColor,
          }}
          onPress={() => {
            setSeconds(60);
          }}>
          Resend
        </Text>
      ) : (
        <Text style={styles.timer}>{`${minutes < 10 ? '0' : ''}${minutes}:${
          seconds < 10 ? '0' : ''
        }${seconds}`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 14,

    color: colors.primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default Timer;
