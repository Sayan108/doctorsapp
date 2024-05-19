import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar, Provider, Text} from 'react-native-paper';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../theme/theme';
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
            size={24}
            color={colors.textColor}
            onPress={navigation}
            style={{marginLeft:8}}
          />
          <Text variant="titleMedium" >{headerText}</Text>
        </Appbar.Header>
        {children}
      </View>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // backgroundColor: theme.colors.surface,
  
  },
  header: {
    backgroundColor: 'white',
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
