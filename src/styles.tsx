import {StyleSheet} from 'react-native';
export const colors = {
  primaryColor: '#65558F',
  textColor: '#000000',
  backGroundColor: '#FFFFFF',
};
export const aspectRatio: number = 1;
export const style = StyleSheet.create({
  view: {
    alignSelf: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    borderWidth: 1,
    flex: 1,
    gap: 16,
  },
  headerView: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 16,
  },
  loginPageHeader: {
    color: colors.textColor,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    //fontFamily: 'roboto',
    padding: 5,
  },
  loginPageTextContainer: {
    width: 300,
    height: 60,
    gap: 8,
  },
  loginPageTextPrimary: {
    color: colors.textColor,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    //fontFamily: 'roboto',
    padding: 5,
  },
  loginPageTextSecondary: {
    color: colors.textColor,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '300',
    //fontFamily: 'roboto',
    lineHeight: 25,
  },
  loginPageImage: {
    width: 156,
    height: 171,
    padding: 40,
  },
});
