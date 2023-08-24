import {StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from '../components/Scale';


export const style = StyleSheet.create({
  test2000: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: moderateScale(10),
    marginTop: moderateScale(-5),
  },
  test1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: moderateScale(10),
    marginTop: moderateScale(-5),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: moderateScale(10),
    padding: moderateScale(10),
    marginBottom: moderateScale(-25),
  },
  temp2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardContainer: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    margin: moderateScale(20),
  },
  elevation: {
    shadowColor: '#009387',
    elevation: 20,
  },
  text1: {
    fontSize: scale(15),
    paddingTop: moderateScale(20),
  },
  text: {
    fontSize: scale(15),
    paddingTop: moderateScale(4),
    color:'#666d75'
  },
  invoiceBtn: {
    backgroundColor: '#1aba9f',
    alignItems: 'center',
    padding: moderateScale(10),
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: moderateScale(100),
    marginRight: moderateScale(100),
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    padding: moderateScale(5),
    paddingVertical: 0,
    paddingLeft: moderateScale(14),
    paddingRight: 0,
  },
  View500: {
    marginLeft: moderateScale(10),
  },
});
