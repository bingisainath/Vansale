import React, {useEffect, memo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {useSelector, useDispatch} from 'react-redux';
import {connect} from 'react-redux';

import {styles} from './Style'; //@ts-ignore
import AnalogClock from 'react-native-clock-analog';
import {useIsFocused} from '@react-navigation/native';
import {scale, moderateScale, verticalScale} from '../components/Scale';

const Home = (props: any) => {
  const isFocused = useIsFocused();

  const [userdata, setUserData] = React.useState({});
  const reduxuserData = useSelector((state: any) => state.data);
  React.useEffect(() => {
    props.getTripCustomer({id: props.data.user.uid, Trip: props.Trip});
    setUserData(reduxuserData);

    customerVisit();
  }, []);

  useEffect(() => {
    customerVisit();
  }, [props.TripCusotmer]);

  useEffect(() => {
    props.getTrip({id: props.data.user.uid, Trip: props.Trip});

    props.getInfo({id: props.data.user.uid, trip: props.Trip.TripId});
  }, [isFocused]);

  const {navigation} = props;

  const LogoutFromSession = async () => {
    await props.getLogout();
  };

  const customerVisit = async () => {
    try {
      //await props.getLoad({id: props.data.user.uid});
      await props.getInfo({id: props.data.user.uid, trip: props.Trip.TripId});
      await props.setProducts({id: props.data.user.uid});
      await props.getContant({id: props.data.user.uid});
      await props.getTripCustomer({id: props.data.user.uid, Trip: props.Trip});
      await props.getTrip({id: props.data.user.uid, Trip: props.Trip});
    } catch (error) {
      console.log(error);
    }
  };
  const inventoryNav = () => {
    navigation.navigate('LoadMain');
  };

  const customerVisitNav = () => {
    if (props.Trip.InventoryCheckout == true) {
      if (props.Trip.Unloaded == false) {
        navigation.navigate('Customer Visit');
        customerVisit();
      } else {
        Alert.alert('Message', 'Products Has Been Unloaded');
      }
    } else {
      Alert.alert('Message', 'Please Process the load to continue !');
    }
  };

  const unLoadNav = () => {
    if (props.Trip.InventoryCheckout == true) {
      Alert.alert('Warning', 'Do you Want to Unload', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            props.setUnLoad({id: props.data.user.uid, Trip: props.Trip}),
              navigation.navigate('saleUnload');
          },
        },
      ]);
    } else {
      Alert.alert('Message', 'Please Process the load to continue !');
    }
  };

  const settlementNav = () => {
    if (props.Trip.InventoryCheckout == true) {
      if (props.Trip.Unloaded == true) {
        navigation.navigate('Settlement');
      } else {
        Alert.alert('Message', 'Products are Not Unloaded');
      }
    } else {
      Alert.alert('Message', 'Please Process the load to continue !');
    }
  };

  return (
    //
    <View style={{backgroundColor: 'white', flex: 2, height: '100%'}}>
      {Dimensions?.get('window')?.height >= 700 ? (
        <Card style={[styles.cardContainer, styles.elevation]}>
          <Card.Content style={{alignItems: 'center'}}>
            <Title
              style={{
                color: '#009387',
                fontSize: scale(23),
                marginTop: moderateScale(20, 0.25),
                fontWeight: 'bold',
              }}>
              Hi, {props?.data?.user?.email?.slice(0, 5)}
            </Title>
          </Card.Content>
          <Card.Content style={{margin: moderateScale(10, 0.25)}}>
            <View
              style={{
                borderBottomColor: 'black',
                alignItems: 'stretch',
                borderBottomWidth: scale(1),
              }}
            />
          </Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: scale(2),
            }}>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.containerRoute,
                    {
                      marginLeft: moderateScale(6),
                      color: 'black',
                      fontWeight: 'bold',
                    },
                  ]}>
                  TripID:
                </Text>
                {
                  <Text
                    style={[
                      styles.containerRoute,
                      {marginLeft: scale(6), color: 'black'},
                    ]}>
                    {props?.Trip?.TripId}
                  </Text>
                }
              </View>
            </Card.Content>

            <Card.Content>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: scale(10),
                    marginTop: scale(5),
                    marginRight: scale(-15),
                    marginLeft: scale(-15),
                  },
                ]}>
                <AnalogClock
                  size={110}
                  colorClock="white"
                  colorNumber="#000000"
                  colorCenter="#00BCD4"
                  colorHour="#FF8F00"
                  colorMinutes="#FFC400"
                  borderRadius="2"
                  autostart={true}
                  showSeconds
                />
              </View>
            </Card.Content>
            <Card.Content>
              <View style={{flexDirection: 'row', marginRight: scale(10)}}>
                <Text
                  style={[
                    styles.containerRoute,
                    {color: 'black', fontWeight: 'bold'},
                  ]}>
                  Route:
                </Text>
                <Text
                  style={[
                    styles.containerRoute,
                    {marginLeft: scale(6), color: 'black'},
                  ]}>
                  {props?.Trip?.RouteId}
                </Text>
              </View>
            </Card.Content>
          </View>
        </Card>
      ) : (
        <Card style={[styles.cardContainer, styles.elevation]}>
          <Card.Content style={{alignItems: 'center'}}>
            <Title
              style={{
                color: '#009387',
                fontSize: scale(23),
                // marginTop: scale(4),
                fontWeight: 'bold',
              }}>
              Hi, {props.data.user.email.slice(0, 5)}
            </Title>
          </Card.Content>
          <Card.Content style={{margin: scale(5)}}>
            <View
              style={{
                borderBottomColor: 'black',
                alignItems: 'stretch',
                borderBottomWidth: scale(1),
              }}
            />
          </Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: scale(2),
            }}>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.containerRoute,
                    {
                      marginLeft: moderateScale(6),
                      color: 'black',
                      fontWeight: 'bold',
                    },
                  ]}>
                  TripID:
                </Text>
                {
                  <Text
                    style={[
                      styles.containerRoute,
                      {marginLeft: scale(6), color: 'black'},
                    ]}>
                    {props?.Trip?.TripId}
                  </Text>
                }
              </View>
            </Card.Content>

            <Card.Content>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: scale(10),
                    marginTop: scale(5),
                    marginRight: scale(-15),
                    marginLeft: scale(-15),
                  },
                ]}>
                <AnalogClock
                  size={110}
                  colorClock="white"
                  colorNumber="#000000"
                  colorCenter="#00BCD4"
                  colorHour="#FF8F00"
                  colorMinutes="#FFC400"
                  borderRadius="2"
                  autostart={true}
                  showSeconds
                />
              </View>
            </Card.Content>
            <Card.Content>
              <View style={{flexDirection: 'row', marginRight: scale(10)}}>
                <Text
                  style={[
                    styles.containerRoute,
                    {color: 'black', fontWeight: 'bold'},
                  ]}>
                  Route:
                </Text>
                <Text
                  style={[
                    styles.containerRoute,
                    {marginLeft: scale(6), color: 'black'},
                  ]}>
                  {props?.Trip?.RouteId}
                </Text>
              </View>
            </Card.Content>
          </View>
        </Card>
      )}

      <View style={{height: '70%', flex: 1.5}}>
        <View style={styles.viewable}>
          <Grid>
            <Col>
              <TouchableOpacity
                onPress={() => inventoryNav()}
                activeOpacity={0.7}
                nextFocusRight={100}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={styles.tinyLogo}
                      source={require('../components/Images/inventory.png')}
                    />
                    <Text style={styles.buttonText}>Inventory</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{marginLeft: scale(10)}}>
              <TouchableOpacity onPress={() => customerVisitNav()}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={{
                        marginTop: moderateScale(6),
                        width: moderateScale(45),
                        height: moderateScale(60),
                      }}
                      source={require('../components/Images/customerVisit3.png')}
                    />
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontWeight: 'bold',
                        paddingTop: moderateScale(7.5),
                        textAlign: 'center',
                        color: 'black',
                      }}>
                      Customer Visit
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
        <View style={styles.viewable}>
          <Grid>
            <Col>
              <TouchableOpacity onPress={() => unLoadNav()}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={{
                        marginTop: moderateScale(8, 0.2),
                        height: 50,
                        width: 70,
                      }}
                      source={require('../components/Images/unload.png')}
                    />
                    <Text style={styles.buttonText}>Unload</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>

            <Col style={{marginLeft: verticalScale(10)}}>
              <TouchableOpacity onPress={() => navigation.navigate('Info')}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={{
                        marginTop: moderateScale(8, 0.2),
                        height: 50,
                        width: 40,
                      }}
                      source={require('../components/Images/invoiceInfo.png')}
                    />
                    <Text style={styles.buttonText}>Information</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
        <View style={styles.viewable}>
          <Grid>
            <Col>
              <TouchableOpacity onPress={() => settlementNav()}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={styles.tinyLogo}
                      source={require('../components/Images/deal.png')}
                    />
                    <Text style={styles.buttonText}>Settlement</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col style={{marginLeft: moderateScale(10)}}>
              <TouchableOpacity onPress={() => LogoutFromSession()}>
                <Card style={styles.cardMainButtonContainer}>
                  <Card.Content style={styles.cardButtonContent}>
                    <Image
                      style={styles.tinyLogo}
                      source={require('../components/Images/logout.png')}
                    />
                    <Text style={styles.buttonText}>LogOut</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </View>
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
    Customer: state.Customer,
    TripCustomer: state.TripCustomer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getLogout(action: any) {
    //console.log(action);
    await dispatch({
      type: 'GET_USERS_LOGOUT',
    });
  },
  async getContant(action: any) {
    await dispatch({
      type: 'LOAD_CUSTOMER',
      id: action.id,
    });
  },
  async getTripCustomer(action: any) {
    await dispatch({
      type: 'TRIP_CUSTOMER',
      id: action.id,
      Trip: action.Trip,
    });
  },
  async getInfo(action: any) {
    await dispatch({
      type: 'LOAD_INFO',
      id: action.id,
      trip: action.trip,
    });
  },
  async setProducts(action: any) {
    await dispatch({
      type: 'SET_PRODUCTS',
      id: action.id,
    });
  },
  async getTrip(action: any) {
    await dispatch({
      type: 'SET_LOAD_TRIP',
      id: action.id,
      Trip: action.Trip,
    });
  },
  async setUnLoad(action: any) {
    await dispatch({
      type: 'SET_UNLOAD',
      id: action.id,
      Trip: action.Trip,
    });
  },
  async getLoad(action: any) {
    await dispatch({
      type: 'LOAD_INVENTORY',
      id: action.id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
