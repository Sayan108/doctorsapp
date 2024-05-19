import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme/theme';

export interface Props {
  children: React.ReactNode;
  navigation: any;
  headerText: string;
}

const Layout = (props: Props) => {
  const { children, navigation, headerText } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.background }]}>
          <Icon
            name="arrow-left"
            size={24}
            color={theme.colors.onBackground}
            onPress={navigation}
            style={styles.icon}
          />
          <View style={styles.titleWrapper}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>
              {headerText}
            </Text>
          </View>
        </Appbar.Header>
      </View>

      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    zIndex: 1, // Ensure the header is on top
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    position: 'relative', // Make sure the header is positioned relative for absolute positioning inside it
  },
  icon: {
    marginLeft: 8,
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
  },
  contentContainer: {
    flex: 1,
    padding: 8, // Padding applied only to content
  },
});

export default Layout;
