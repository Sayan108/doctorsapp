import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../theme/theme";
import { Text } from "react-native-paper";

export interface Props {
  children: React.ReactNode;
  navigation?: () => void;
  headerText?: string;
  hideBackButton?: boolean;
}

const Layout = (props: Props) => {
  const { children, headerText } = props;
  let hideBackButton = props.hideBackButton;
  const navigation = useNavigation();

  hideBackButton = hideBackButton ? hideBackButton : false;

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:theme.colors.surface}]}>
      {/* Header */}
      <View style={styles.header}>
        {/* back button */}
        {!hideBackButton && headerText ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24}/>
          </TouchableOpacity>
        ) : null}

        {/* header text */}
        {headerText ? (
          <View style={styles.headerTextContainer}>
            <Text variant= 'titleMedium'>{headerText}</Text>
          </View>
        ) : null}
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  backButton: {
    paddingRight: 20,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  content: {
    paddingTop: 10,
    flexGrow: 1,
  },
});

export default Layout;
