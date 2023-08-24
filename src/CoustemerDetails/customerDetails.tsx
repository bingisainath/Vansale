import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import {Card, Title} from 'react-native-paper';
import { connect } from 'react-redux';
import {scale, moderateScale, verticalScale} from '../components/Scale';

const CustomerDetails = (props:any) => {


  const onPressMobileNumberClick = (number: string) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  useEffect(() => {
   props.getCustomerDetails({id:props.data.user.uid,customerId:props.route.params.id.Id})
  },[])


// console.log("membersicne",props.route.params.id)
  return (
    <View style={styles.mainView}>
      <Card style={styles.cardMainButtonContainer}>
        <Card.Content>
          <View style={styles.containDetails}>
            <View style={styles.containUserInfo}>
              {/* // iuser -id */}
              <View
                style={{alignItems: 'center', marginBottom: moderateScale(20)}}>
                <Image
                  source={require('../components/Images/profile.png')}
                  style={{}}
                />
                <Text
                  style={{
                    color: 'black',
                    marginTop: moderateScale(10),
                    fontSize: scale(20),
                  }}>
                  {props.route.params.id.Id}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../components/Images/email.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  Email: {props?.CustomerDetail?.Email}
                </Text>
              </View>
              {/* // user name */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../components/Images/user.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  Name : {props?.CustomerDetail?.Name}
                </Text>
              </View>
              {/* // phone number */}

              <Pressable
                style={{flexDirection: 'row'}}
                onPress={() => {
                  onPressMobileNumberClick(props?.CustomerDetail?.Phone);
                }}>
                <Image
                  source={require('../components/Images/call.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  Phone : {props?.CustomerDetail?.Phone}
                </Text>
              </Pressable>
              {/* // address */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../components/Images/map.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  Address : {props?.CustomerDetail?.Address}
                </Text>
              </View>
              {/* // member since */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../components/Images/since.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  Member Since : {props?.CustomerDetail?.MemberSince}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    loginFail: state.loginFail,
    isLogin: state.isLogin,
    Trip: state.Trip,
    CustomerDetail : state.CustomerDetail
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getCustomerDetails(action: any) {
    await dispatch({
      type: 'GET_CUSTOMER_DETAIL',
      id: action.id,
      customerId: action.customerId,
    });
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomerDetails);


const styles = StyleSheet.create({
  mainView:{
    flex:1,
    backgroundColor:'white'
  },
  cardMainButtonContainer: {
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScale(5),
    backgroundColor: 'white',
    borderColor: '#009387',
    borderWidth: 1,
    borderRadius: 18,
    marginTop: moderateScale(30),
    elevation: 55,
  },

  image: {
    width: moderateScale(120),
    height: verticalScale(120),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'green',
  },
  containDetails: {
    flexDirection: 'row',
  },
  containUserInfo: {
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    flex: 1,
    padding: moderateScale(5),
  },
  textStyle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    marginRight: moderateScale(60),
    padding: moderateScale(3 ),
    textAlign: 'justify',
    color:'black'
  },
  imageStyle: {
    height: verticalScale(23),
    width: moderateScale(23),
    marginRight: moderateScale(20),
    padding: moderateScale(15),
    marginBottom: moderateScale(10),
  },
});
