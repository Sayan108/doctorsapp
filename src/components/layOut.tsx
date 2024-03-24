import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export interface Props {
  children: React.ReactNode;
  navigation: any;
  headerText: string;
}
const Layout = (props: Props) => {
  const {children, navigation, headerText} = props;
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Icon
          name="arrow-left"
          size={35}
          color={colors.textColor}
          onPress={navigation}
        />
        <Text style={styles.title}>{headerText}</Text>
      </Appbar.Header>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 30,
    color: colors.textColor,
  },
});

export default Layout;
