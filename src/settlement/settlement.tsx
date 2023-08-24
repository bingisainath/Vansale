
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card, Title} from 'react-native-paper';
import {connect} from 'react-redux';

import Cash from './Cash';

import {style} from './Style';

const Settlement = (props: any) => {
  const {navigation} = props;

  useEffect(() => {
    const Price =
      No_OF_2000 * 2000 +
      No_OF_500 * 500 +
      No_OF_200 * 200 +
      No_OF_100 * 100 +
      No_OF_50 * 50 +
      No_OF_20 * 20 +
      No_OF_10 * 10 +
      No_OF_1 * 5;
    setTotalCash(Price);
  });

  const [totalCash, setTotalCash] = useState(0);
  const [No_OF_2000, setNo_OF_2000] = useState(0);
  const [No_OF_500, setNo_OF_500] = useState(0);
  const [No_OF_200, setNo_OF_200] = useState(0);
  const [No_OF_100, setNo_OF_100] = useState(0);
  const [No_OF_50, setNo_OF_50] = useState(0);
  const [No_OF_20, setNo_OF_20] = useState(0);
  const [No_OF_10, setNo_OF_10] = useState(0);
  const [No_OF_1, setNo_OF_1] = useState(0);

  const setDenomination = async () => {
    const data = {
      No_of_2000: No_OF_2000,
      No_of_500: No_OF_500,
      No_of_200: No_OF_200,
      No_of_100: No_OF_100,
      No_of_50: No_OF_50,
      No_of_20: No_OF_20,
      No_of_10: No_OF_10,
      No_of_1: No_OF_1,
    };
    await props.setDenomination({
      id: props.data.user.uid,
      data: data,
      Trip: props.Trip,
    });

    Alert.alert('Alert', 'Your Trip Has been Completed', [
      {text: 'OK', onPress: () => props.getLogout()},
    ]);
  };

  const logout = async () => {
    await LogoutFromSession();
  };

  useEffect(() => {
    props.getInvoiceData({
      id: props.data.user.uid,
      trip: props.Trip.TripId,
    });
  }, []);

  const LogoutFromSession = async () => {
    await props.getLogout();
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <KeyboardAvoidingView>
        <View>
          <Card style={[style.cardContainer, style.elevation]}>
            <Card.Content>
              <Title>Total Cash : {props.Totalcash}</Title>
            </Card.Content>
            <Card.Content style={{paddingBottom: 20}}>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}
              />
            </Card.Content>
            <Card.Content>
              <Text style={{fontSize: 20,color:'black'}}>Cash Collected: {totalCash}</Text>
            </Card.Content>
          </Card>
          <Card style={[style.cardContainer, , style.elevation]}>
            <Card.Content style={{marginBottom: 5}}>
              <Title>Denomination Entry</Title>
            </Card.Content>
            <Card.Content>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </Card.Content>
            <Card.Content>
              <View style={style.test2000}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_2000(data)}
                  cash="2000"
                  state={No_OF_2000}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_500(data)}
                  cash="500"
                  state={No_OF_500}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_200(data)}
                  cash="200"
                  state={No_OF_200}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_100(data)}
                  cash="100"
                  state={No_OF_100}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_50(data)}
                  cash="50"
                  state={No_OF_50}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_20(data)}
                  cash="20"
                  state={No_OF_20}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_10(data)}
                  cash="10"
                  state={No_OF_10}
                />
              </View>
              <View style={style.test1}>
                <Cash
                  term={0}
                  onTermChange={(data: any) => setNo_OF_1(data)}
                  cash="1"
                  state={No_OF_1}
                />
              </View>
            </Card.Content>
          </Card>
          <View>
            <TouchableOpacity
              style={style.invoiceBtn}
              onPress={() => setDenomination()}>
              <Text style={{color: 'darkblue', fontWeight: '900'}}>
                Complete Trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    loginFail: state.loginFail,
    isLogin: state.isLogin,
    Inventory: state.Inventory,
    Customer: state.Customer,
    Trip: state.Trip,
    Totalcash: state.Totalcash,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getLoad(action: any) {
    await dispatch({
      type: 'LOAD_INVENTORY',
      id: action.id,
    });
  },
  async setDenomination(action: any) {
    await dispatch({
      type: 'SET_DENOMATION_ENTRY',
      id: action.id,
      data: action.data,
      Trip: action.Trip,
    });
  },
  async getLogout(action: any) {
    //console.log(action);
    await dispatch({
      type: 'GET_USERS_LOGOUT',
    });
  },
  async getInvoiceData(action: any) {
    await dispatch({
      type: 'SET_TOTAL_CASH',
      id: action.id,
      trip: action.trip,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settlement);