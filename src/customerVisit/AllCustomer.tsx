import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {connect} from 'react-redux';
// import { FlashList } from '@shopify/flash-list';
import {styles} from './Style';

const CustomerView = (props: any) => {
  const {navigation} = props;
  const gotoCustomer = (item: any) => {
    const data = {Id: item.CustomerID};
    navigation.navigate('CoustemerDetails', {id: data});
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [filteredContact, setFilteredContact] = useState(props?.allCustomer);

  useEffect(() => {
    if (props?.allCustomer == undefined || props?.allCustomer == '') {
    } else {
      const newContacts = props?.allCustomer?.filter(
        (contact: {CustomerID: string}) =>
          contact.CustomerID.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredContact(newContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
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

      console.log('============= props?.allCustomer =======================');
      console.log(props?.allCustomer);
      console.log('====================================');
    };
    calling();
  }, []);

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
      <View style={{marginTop: 10, flex: 1}}>
        {/* {isAPIbusy == false && filteredContact != '' ? ( */}
        <FlatList
          // estimatedItemSize={3}
          data={filteredContact ? filteredContact : props?.allCustomer}
          renderItem={({item}) => (
            <Card style={styles.cardMainButtonContainer}>
              <Card.Content style={styles.cardButtonContent}>
                <View style={styles.ButtonAlignment}>
                  <View style={styles.ButtonViewText}>
                    <Text
                      style={[
                        styles.buttonText,
                        {fontStyle: 'italic', fontWeight: 'bold'},
                      ]}>
                      {item.CustomerID}
                    </Text>
                    {/* <Text style={styles.buttonText}>{item.Name}</Text> */}
                    <Text style={styles.buttonText}>{item.Name}</Text>
                    <Text style={styles.buttonText}>{item.Address}</Text>
                  </View>
                  <View style={styles.buttonImageViewAll}>
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
          )}
        />
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
    allCustomer: state.allCustomer,
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
  async getAllCustomer(action: any) {
    await dispatch({
      type: 'GET_ALL_CUSTOMER',
      payload: action.customer,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerView);
