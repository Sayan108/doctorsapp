import {StyleSheet} from 'react-native';
export const colors = {
  primaryColor: '#F54749',
  textColor: '#000000',
  backGroundColor: '#FFFFFF',
};
export const aspectRatio: number = 1;
export const style = StyleSheet.create({
  view: {
    alignSelf: 'center',
    color: colors.backGroundColor,
    alignItems: 'center',
  },
  headerView: {
    backgroundColor: 'inherit',
    alignSelf: 'center',
    width: 325 * aspectRatio,
    height: 42 * aspectRatio,
    paddingBottom: 10,
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
    height: 59,
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
