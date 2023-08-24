import {View, Text, Button} from 'react-native';
import React, {useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';

import Settlement from '../settlement/settlement';
import Invoice from '../invoice/Invoice';
import Home from '../home/Home';
import SignIn from '../login/SignIn';
import Info from '../info/Info';
import LoadScreen from '../load/Load';
import CustomerViewMain from '../customerVisit/CustomerVisitMain';
import CustomerDetails from '../CoustemerDetails/customerDetails';
import UnLoadScreen from '../salesUnload/UnLoadScreen';
import SaleUnload from '../unLoad/Unload';
import LoadMain from '../load/LoadMain';
import nearByCustomers from '../customerVisit/mapView/NearByCustomers';
import nearByCustomersList from '../nearByCustomers/NearByCustomers';
import NearByCustomer2 from '../customerVisit/mapView/NearByCustomer2';

const Stack = createNativeStackNavigator();

const AuthenticationScreen = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        initialParams={{...props}}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center',headerTintColor:'white', headerStyle: { backgroundColor: '#009387' ,} }}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="LoadMain" component={LoadMain} options={{title: 'Load',}}/>
      <Stack.Screen name="Inventory" component={LoadScreen} options={{title: 'Load',}}/>
      <Stack.Screen name="Customer Visit" component={CustomerViewMain} />
      <Stack.Screen name="UnLoadScreen" component={UnLoadScreen} options={{title: 'Sales',}}/>
      <Stack.Screen name="saleUnload" component={SaleUnload} options={{title: 'Unload',}}/>
      <Stack.Screen name="Info" component={Info} options={{title: 'Information',}}/>
      <Stack.Screen name="Settlement" component={Settlement} />
      <Stack.Screen name="Invoice" component={Invoice} options={{headerShown: false}}/>
      <Stack.Screen name="CoustemerDetails" component={CustomerDetails} options={{title: 'Customer Details',}}/>
      <Stack.Screen name="nearByCustomers" component={nearByCustomers} options={{headerShown: false}} />
      <Stack.Screen name="nearByCustomersList" component={nearByCustomersList} />
      <Stack.Screen name="NearByCustomer2" component={NearByCustomer2} />
      
    </Stack.Navigator>
  );
};

const Main = (props:any) => {

  return (
    <NavigationContainer>
        {!props.isLogin ? <AuthenticationScreen /> : <HomeScreen />}
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    loginFail: state.loginFail,
    isLogin: state.isLogin
  };
};

export default connect(mapStateToProps)(Main);
