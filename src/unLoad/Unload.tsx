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
import {FlashList} from '@shopify/flash-list';

const SalesUnload = (props: any) => {
  const {navigation} = props;

  const isFocused = useIsFocused();

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    props.getLoad({id: props.data.user.uid});
  }, [refresh]);

  useEffect(() => {
    props.getLoad({id: props.data.user.uid});
  }, [isFocused]);

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
                marginLeft: moderateScale(15),
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: moderateScale(20)}} />
      <View style={{flex: 0.98, backgroundColor: 'white'}}>
        <FlashList
          style={{backgroundColor: 'white'}}
          data={props?.Inventory}
          renderItem={renderItem}
          estimatedItemSize={5}
        />
      </View>
      <View style={{paddingTop: moderateScale(10)}}>
        <TouchableOpacity
          onPress={() => setRefresh(!refresh)}
          style={{alignItems: 'center'}}>
          <Image
            source={require('../components/Images/Refresh.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: moderateScale(5),
          borderColor: 'black',
          borderWidth: 1,
          marginHorizontal: moderateScale(60),
          marginTop: moderateScale(10),
          borderRadius: 10,
          backgroundColor: '#0fd1ad',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>Unload Done</Text>
        </TouchableOpacity>
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
    Inventory: state.Inventory,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getLoad(action: any) {
    await dispatch({
      type: 'LOAD_INVENTORY',
      id: action.id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesUnload);

const styles = StyleSheet.create({
  Text: {
    marginLeft: moderateScale(10),
    color: 'black',
    fontWeight: 'bold',
  },
});
