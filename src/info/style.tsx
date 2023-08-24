import { StyleSheet } from "react-native";
import {scale, moderateScale, verticalScale} from '../components/Scale';


export const styles = StyleSheet.create({
  viewMain: {flex: 1, backgroundColor: 'white'},
  cardMainButtonContainer: {
    marginLeft: scale(25),
    marginRight: scale(25),
    marginBottom: scale(10),
    backgroundColor: 'white',
    borderColor: '#009387',
    borderWidth: 1.5,
    borderRadius: 18,
    elevation: 15,
    color: 'white',
  },
  cardButtonContent: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'black',
    padding: scale(1),
  },
  dataText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#444957',
    padding: scale(1),
  },
  textInputDesign: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginTop: scale(15),
    marginLeft: scale(10),
    marginRight: scale(10),
    marginBottom: scale(5),
    padding: scale(15),
    borderWidth: 2,
    borderColor: 'black',
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
});
