import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect, Connect, useSelector} from 'react-redux';
import {Image} from 'react-native-animatable';
import {useIsFocused} from '@react-navigation/native';
import {scale, moderateScale, verticalScale} from '../components/Scale';


const LoadScreen = (props: any) => {

  const {navigation} = props;

  const isFocused = useIsFocused();

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    props.getLoad({id: props.data.user.uid});
  }, [refresh]);

  useEffect(() => {
    props.getLoad({id: props.data.user.uid});
    props.getTrip({id: props.data.user.uid, Trip: props.Trip});
    //props.getTripCustomer({id: props.data.user.uid, Trip: props.Trip});
  }, [isFocused]);

  const CheckedOut = async () => {
    await props.SetInventoryCheckedOut({id: props.data.user.uid, Trip: props.Trip});
    await props.getTrip({id: props.data.user.uid, Trip: props.Trip});
    await props.setProducts({id: props.data.user.uid});
    await props.getLoad({id: props.data.user.uid});
  };


  const renderItem = ({item}: any) => {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            marginHorizontal: moderateScale(20),
            marginBottom: moderateScale(5),
            backgroundColor: 'white',
            borderColor: '#009387',
            borderWidth: 1,
            borderRadius: 18,
            elevation: 20,
            padding: moderateScale(15),
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
            }}>
            <View
              style={{
                borderRadius: 100,
                width: '10%',
                margin: moderateScale(5),
              }}>
              <Image
                source={{
                  uri: item.Image,
                }}
                style={{height: 50, width: 50}}
              />
            </View>
            <View
              style={{
                width: '50%',
                margin: moderateScale(5),
                marginLeft: moderateScale(20),
              }}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View></View>
                <Text style={[styles.Text, {width: '35%'}]}>ID Code</Text>
                <Text style={{color: 'black'}}>: {item.ProductID}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.Text, {width: '30%'}]}>Name</Text>
                <Text style={{color: 'black'}}>: {item.Name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.Text, {width: '45%'}]}>Unit Price</Text>
                <Text style={{color: 'black'}}>: {item.Price}</Text>
              </View>
            </View>
            <View style={{width: '30%', margin: moderateScale(5)}}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Text style={[styles.Text, {width: '50%'}]}>Cases</Text>
                <Text style={{color: 'black'}}>: {item.Cases}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.Text, {width: '50%'}]}>Units</Text>
                <Text style={{color: 'black'}}>: {item.Units}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: moderateScale(20),
        backgroundColor: 'white',
      }}>
      {props.Trip.InventoryCheckout == true ? (
        <View style={{alignItems: 'center', backgroundColor: 'white'}}>
          <Text
            style={{
              padding: moderateScale(30),
              fontSize: scale(20),
              fontWeight: 'bold',
              color:'grey'
            }}>
            No Records !
          </Text>
        </View>
      ) : (
        <View style={{flex: 0.97, backgroundColor: 'white'}}>
          <View style={{flex: 0.97, backgroundColor: 'white'}}>
            <FlatList
              style={{backgroundColor: 'white'}}
              data={props?.Inventory}
              renderItem={renderItem}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 0.05,
              alignItems: 'center',
              marginHorizontal: moderateScale(30),
              borderColor: 'black',
              borderWidth: 1,
              marginTop: moderateScale(20),
              marginBottom: moderateScale(0),
              paddingTop: moderateScale(10),
              backgroundColor: '#1aba9f',
            }}
            onPress={() => CheckedOut()}>
            <Text
              style={{
                // marginTop: moderateScale(3),
                color: 'black',
                fontWeight: 'bold',
              }}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    loginFail: state.loginFail,
    isLogin: state.isLogin,
    Inventory: state.Inventory,
    InventoryCheckedOut: state.InventoryCheckedOut,
    Trip: state.Trip,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getLoad(action: any) {
    await dispatch({
      type: 'LOAD_INVENTORY',
      id: action.id,
    });
  },
  async SetInventoryCheckedOut(action: any) {
    await dispatch({
      type: 'SET_INVENTORY_CHECKEDOUT',
      id: action.id,
      Trip: action.Trip,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadScreen);

const styles = StyleSheet.create({
  Text: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  
});
