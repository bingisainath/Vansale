import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from '../components/Scale';


export const styles = StyleSheet.create({
  page: {
    paddingHorizontal: moderateScale(12),
    backgroundColor: 'white',
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  textInputDesign: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
    padding: scale(10),
    borderWidth: 2,
  },
  cardMainButtonContainer: {
    marginLeft: moderateScale(15),
    marginRight: moderateScale(15),
    minHeight: moderateScale(110),
    maxHeight: moderateScale(120),
    marginBottom: moderateScale(5),
    backgroundColor: 'white',
    borderColor: '#009387',
    borderWidth: 1,
    borderRadius: 18,
    marginTop: moderateScale(10),
    elevation: 15,
  },
  cardButtonContent: {
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale(16),
    color: 'black',
    padding: 1,
  },
  ButtonAlignment: {
    flexDirection: 'row',
  },
  ButtonViewText: {
    margin: moderateScale(5),
    flex: 1,
  },
  buttonImageView: {
    borderWidth: 2,
    marginBottom: moderateScale(60),
    borderRadius: moderateScale(100),
    borderColor: 'green',
    elevation: 40,
  },
  buttonImageViewAll: {
    borderWidth: 2,
    marginBottom: moderateScale(80),
    borderRadius: 100,
    borderColor: 'green',
    elevation: 40,
  },
  buttonImage: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
