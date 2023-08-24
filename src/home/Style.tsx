import { StyleSheet } from "react-native";
import {scale, moderateScale, verticalScale} from '../components/Scale';


export const styles = StyleSheet.create({
  cardMainButtonContainer: {
    marginHorizontal: moderateScale(10),
    minHeight: verticalScale(130),
    maxHeight: verticalScale(130),
    marginBottom: scale(8),
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 18,
    elevation: 20,
    shadowColor: '#000',
  },
  cardButtonContent: {
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    paddingTop: moderateScale(10),
    textAlign: 'center',
    color: 'black',
  },

  viewable: {
    flexDirection: 'row',
    // margin: 15,
    marginRight: moderateScale(20),
    marginLeft: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
    // height:'23%',
  },
  cardContainer: {
    borderColor: '#009387',
    borderWidth: 1,
    paddingBottom: scale(5),
    backgroundColor: 'white',
    borderRadius: 25,
    margin: moderateScale(15),
    marginTop: moderateScale(10),
    alignItems: 'center',
    height: '30%',
    flex: 0.65,
  },
  elevation: {
    shadowColor: '#009387',
    elevation: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginTop: moderateScale(8, 0.2),
  },
  container: {
    backgroundColor: 'red',
    borderRadius: 100,
  },
  containerRoute: {
    fontSize: moderateScale(18, 0.2),
  },
});