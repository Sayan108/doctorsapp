import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar, PaperProvider} from 'react-native-paper';
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
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Icon
            name="arrow-left"
            size={24}
            color={colors.textColor}
            onPress={navigation}
          />
          <Text style={styles.title}>{headerText}</Text>
        </Appbar.Header>
        {children}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: theme.colors.surface,
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
