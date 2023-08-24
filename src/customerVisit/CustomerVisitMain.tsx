import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text,ActivityIndicator} from 'react-native';

import CustomerView from './CustomerView';
import AllCustomer from './AllCustomer';
import nearByCustomers2 from './mapView/NearByCustomer2';
import { styles } from './Style';
import {scale, moderateScale, verticalScale} from '../components/Scale';

const Tab = createMaterialTopTabNavigator();

function CustomerViewMain(props: any) {

  const [isApiBusy,setIsApiBusy] = useState(true);

  const loadData = async () => {

      await props.getContact({id: props.data.user.uid});
      await props.getTripCustomer({id: props.data.user.uid, Trip: props.Trip});
      await props.loading();
  
      setTimeout(() => {
        setIsApiBusy(false)
      },1000)
  }

  useEffect(() => {
      loadData()

      const customer: any[] | any = [];
    const calling = async () => {
      await props?.Customer?.forEach(async (element: any) => {
        await props?.TripCustomer?.Customer?.forEach(async (data: any) => {
          if (element.CustomerID == data.Id) {
            customer.push(element);
          }
        });
      });

      await props.getAllCustomer({customer: customer});

    };
    calling();

  }, []);

  return (
    <View style={{flex: 1}}>
      {isApiBusy ? (
        <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading Data...</Text>
      </View>
      ) : (
        <Tab.Navigator
          initialRouteName="Sequence"
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarLabelStyle: {
              fontSize: scale(12),
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
            //@ts-ignore
            tabBarIndicatorStyle: {
              height: null,
              top: '10%',
              bottom: '10%',
              width: '33%',
              backgroundColor: '#2ac7b2',
            },

            tabBarStyle: {
              backgroundColor: '#009387',
              borderColor: 'white',
              borderTopWidth: 2,
              alignSelf: 'center',
              width: '100%',
              paddingTop: moderateScale(6),
            },
          }}>
          <Tab.Screen
            name="Squence"
            component={CustomerView}
            options={{tabBarLabel: 'Sequences'}}
          />
          <Tab.Screen
            name="All Customer"
            component={AllCustomer}
            options={{tabBarLabel: 'All Customer'}}
          />
          <Tab.Screen
            name="nearBy2"
            component={nearByCustomers2}
            options={{tabBarLabel: 'nearBy'}}
          />
        </Tab.Navigator>
      )}
    </View>
  );
}

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    Trip: state.Trip,
    loadingData: state.loadingData,
    Customer: state.Customer,
    TripCustomer: state.TripCustomer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getContact(action: any) {
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
  async loading() {
    await dispatch({
      type: 'LOADING',
    });
  },
  async getAllCustomer(action: any) {
    await dispatch({
      type: 'GET_ALL_CUSTOMER',
      payload: action.customer,
    });
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(CustomerViewMain);
