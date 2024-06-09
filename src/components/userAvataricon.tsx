import React from 'react';
import { Avatar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface UserAvatarProps {
  name: string;
  size?: number;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name ,size=40}) => {
  const nameArray = name.split(' ');
  let letterToShow = '';
  if (nameArray.length > 1) {
    letterToShow = nameArray[0][0] + nameArray[nameArray.length - 1][0];
  } else if (nameArray.length === 1) {
    letterToShow = nameArray[0][0];
  }

  return (
    <View style={styles.container}>
      <Avatar.Text
        label={letterToShow}
        size={size}
        style={{ backgroundColor: stringToColor(name) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserAvatar;
