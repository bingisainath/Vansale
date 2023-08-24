import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {styles} from './Style';
import {scale, moderateScale, verticalScale} from '../components/Scale';


const CustomerView = (props: any) => {
  const {navigation} = props;

  const isFocused = useIsFocused();

  const gotoCustomer = (item: any) => {
    navigation.navigate('CoustemerDetails', {id: item});
  };

  const gotoUnload = async (item: any) => {
    
    await props.setStartTime({
        id: props.data.user.uid,
        customerId: item.Id,
        trip:props.Trip.TripId
      });
    navigation.navigate('UnLoadScreen', {id: item});
  };

  const [isAPIbusy, setAPIBusy] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContact, setFilteredContact] = useState(
    props?.TripCustomer?.Customer,
  );

  useEffect(() => {
    if (props?.Customer == undefined || props?.Customer == '') {
    } else {
      const newContacts = props?.TripCustomer?.Customer?.filter(
        (contact: {CustomerID: string}) =>
          //@ts-ignore
          contact.Id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredContact(newContacts);
      
    }
  }, [searchTerm]);

  const callData = async () => {
      await props.getContant({id: props.data.user.uid});
      await props.getTripCustomer({id: props.data.user.uid, Trip: props.Trip});
      await props.getLoad({id: props.data.user.uid});
      setAPIBusy(false)
  }

  useEffect(() => {
    try {
      callData()
    } catch (error) {
      console.log(error);
    }
  }, [isFocused]);

  // render
  return (
    <View style={[styles.page, {flex: 1, backgroundColor: 'white'}]}>
      <View>
        <TextInput
          style={styles.textInputDesign}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search by Name"
        />
      </View>
      <View style={{marginTop: moderateScale(10), flex: 1}}>
        {isAPIbusy == false ? (
          <FlashList
            estimatedItemSize={3}
            data={
              filteredContact ? filteredContact : props?.TripCustomer?.Customer
            }
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => gotoUnload(item)}>
                {item?.VisitDate?.includes('Mon') ||
                item?.VisitDate?.includes('Tue') ||
                item?.VisitDate?.includes('Wed') ||
                item?.VisitDate?.includes('Thu') ||
                item?.VisitDate?.includes('Fri') ? (
                  <Card style={styles.cardMainButtonContainer}>
                    <Card.Content style={styles.cardButtonContent}>
                      <View style={styles.ButtonAlignment}>
                        <View style={styles.ButtonViewText}>
                          <Text
                            style={[
                              styles.buttonText,
                              {fontStyle: 'italic', fontWeight: 'bold'},
                            ]}>
                            {item.Id}
                          </Text>
                          {/* <Text style={styles.buttonText}>{item.Name}</Text> */}
                          <Text style={styles.buttonText}>
                            {item.VisitDate}
                          </Text>
                          {item.Visited ? (
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.buttonText}>Visited : </Text>
                              <Text
                                style={{
                                  color: '#26ed02',
                                  fontWeight: 'bold',
                                  fontSize: scale(14),
                                  marginTop: moderateScale(2),
                                }}>
                                YES
                              </Text>
                            </View>
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              <Text style={styles.buttonText}> Visited : </Text>
                              <Text
                                style={{
                                  color: 'red',
                                  fontWeight: 'bold',
                                  fontSize: scale(14),
                                  marginTop: moderateScale(2),
                                }}>
                                NO
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.buttonImageView}>
                          <TouchableOpacity onPress={() => gotoCustomer(item)}>
                            <Image
                              source={require('../components/Images/info.png')}
                              style={styles.buttonImage}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                ) : null}
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" />
            <Text>Loading fruits...</Text>
          </View>
        )}
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
    Customer: state.Customer,
    Trip: state.Trip,
    TripCustomer: state.TripCustomer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
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
  async setStartTime(action: any) {
    //console.log('checing set startime');
    await dispatch({
      type: 'SET_START_TIME',
      id: action.id,
      customerId: action.customerId,
      trip: action.trip
    });
  },
  async getLoad(action: any) {
    await dispatch({
      type: 'LOAD_INVENTORY',
      id: action.id,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
