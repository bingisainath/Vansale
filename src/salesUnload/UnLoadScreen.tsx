import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from 'react-native';
import {connect, Connect, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {scale, moderateScale, verticalScale} from '../components/Scale';

const unLoadScreen = (props: any) => {
  const {navigation} = props;

  const [input, setInput] = useState();
  const [cases, setCases] = useState([{}]);
  const [units, setUnits] = useState([{}]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContact, setFilteredContact] = useState(props?.Inventory);
  const [storeInv, setStoreInv] = useState(props?.Inventory);

  const [products, setProducts] = useState({data: props?.Products});
  const [newproducts, setnewProducts] = useState({data: []});

  const [validateProdCases, setvalidateProdCases] = useState(false);
  const [validateProdUnits, setvalidateProdUnits] = useState(false);

  const [totalCost, setTotalCost] = useState(0);
  const isFocused = useIsFocused();

  const setInvoice = async () => {
    console.log('================== new products ==================');
    console.log(newproducts);
    console.log('====================================');
    const billDate = new Date().toString();
    const BillNo =
      props.route.params.id.Id.slice(0, 3) +
      billDate.slice(11, 13) +
      billDate.slice(16, 18) +
      billDate.slice(19, 21);
    await props.setInvoice({
      id: props.data.user.uid,
      customerId: props.route.params.id.Id,
      products: newproducts,
      products1: newproducts,
      Trip: props.Trip,
      BillNo: BillNo,
      TotalCost: totalCost,
    });

    setProducts({data: []});

    await props.setVisit({
      id: props.data.user.uid,
      customerId: props.route.params.id.Id,
      Trip: props.Trip,
    });

    navigation.navigate('Invoice', {
      customerProps: props.route.params.id,
    });
  };

  const LoadData = async () => {
    await props.getLoad({id: props.data.user.uid});
    await props.setProducts({id: props.data.user.uid});
  };

  const addCases = (Id: any) => {
    //@ts-ignore
    if (Id.Cases < input) {
      Alert.alert('Quantity Not Avaliable');
    } else {
      const oldstate = cases;
      const data = {ProductID: Id.ProductID, Cases: input};
      const newcases: any = [...oldstate, data];
      setCases(newcases);
    }
  };

  const addUnits = (Id: any): any => {
    //@ts-ignore
    if (Id.Units < input) {
      Alert.alert('Quantity Not Avaliable');
    } else {
      const oldstate = units;
      const data = {ProductID: Id.ProductID, Units: input};
      const newunits: any = [...oldstate, data];
      setUnits(newunits);
    }
  };

  useEffect(() => {
    const data = async () => {
      await LoadData();
    };
    data();
  }, []);

  useEffect(() => {
    props.getLoad({id: props.data.user.uid});
    LoadData();
    setFilteredContact(props?.Inventory);
  }, [isFocused, isEnabled]);

  useEffect(() => {
    if (props?.Inventory == undefined && props?.Inventory) {
      console.log('====================================');
      console.log('Inventory are undefined');
      console.log('====================================');
    } else {
      const newContacts = props?.Inventory?.filter(
        (contact: {ProductID: string}) =>
          contact.ProductID.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredContact(newContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (products?.data == undefined) {
      console.log('====================================');
      console.log('Products are undefined');
      console.log('====================================');
    } else {
      let totalcash = 0;
      // products == null
      setProducts(newproducts);
      cases?.forEach((element: any) => {
        products?.data?.forEach((data: any) => {
          if (element.ProductID == data.ProductID) {
            setProducts((data.Cases = element.Cases));
          }
        });
      });

      let caseTimes = 0;
      for (let i = 0; i < cases.length - 1; i++) {
        //@ts-ignore
        if (cases[cases.length - 1].ProductID == cases[i].ProductID) {
          caseTimes++;
        }
      }

      let tempPrice = 0;
      let tempCases = 0;
      let unitPerCase = 0;
      if (caseTimes != 0) {
        for (let i = cases.length - 1; i > 0; i--) {
          if (
            //@ts-ignore
            cases[cases.length - 1].ProductID == cases[i].ProductID &&
            i != cases.length - 1
          ) {
            props?.Inventory?.forEach((element: any) => {
              //@ts-ignore
              if (cases[cases.length - 1].ProductID == element.ProductID) {
                //@ts-ignore
                tempCases = cases[i].Cases;
                tempPrice = element.Price;
                unitPerCase = element.UnitsPerCase;
              }
            });
            break;
          }
        }

        const oldCash = tempCases * unitPerCase * tempPrice;

        //@ts-ignore
        const newPrice =
          tempPrice * (cases[cases.length - 1].Cases * unitPerCase);

        const newCash = totalCost - oldCash + newPrice;
        setTotalCost(newCash);
      } else {
        let cash = 0;
        props?.Inventory?.forEach((element: any) => {
          //@ts-ignore
          if (cases[cases.length - 1].ProductID == element.ProductID) {
            const temp = //@ts-ignore
              cases[cases.length - 1].Cases *
              element.UnitsPerCase *
              element.Price;
            cash = totalCost + temp;
          }
        });

        setTotalCost(cash);
      }

      const temp = products;
      setnewProducts(products);
      setProducts(temp);
    }
  }, [cases]);

  useEffect(() => {
    if (products?.data == undefined && props?.Inventory) {
      console.log('====================================');
      console.log('If else');
      console.log('====================================');
    } else {
      let totalcash = 0;
      setProducts(newproducts);
      units.forEach((element: any) => {
        products?.data?.forEach((data: any) => {
          if (element.ProductID == data.ProductID) {
            setProducts((data.Units = element.Units));
          }
        });
      });

      let unitTimes = 0;
      for (let i = 0; i < units.length - 1; i++) {
        //@ts-ignore
        if (units[units.length - 1].ProductID == units[i].ProductID) {
          unitTimes++;
        }
      }

      let tempPrice = 0;
      let tempUnits = 0;
      if (unitTimes != 0) {
        for (let i = units.length - 1; i > 0; i--) {
          if (
            //@ts-ignore
            units[units.length - 1].ProductID == units[i].ProductID &&
            i != units.length - 1
          ) {
            props?.Inventory?.forEach((element: any) => {
              //@ts-ignore
              if (units[units.length - 1].ProductID == element.ProductID) {
                //@ts-ignore
                tempUnits = units[i].Units;
                tempPrice = element.Price;
              }
            });
            break;
          }
        }
        const oldCash = tempUnits * tempPrice;
        //@ts-ignore
        const newPrice = tempPrice * units[units.length - 1].Units;
        const newCash = totalCost - oldCash + newPrice;
        setTotalCost(newCash);
      } else {
        let cash = 0;
        props?.Inventory?.forEach((element: any) => {
          //@ts-ignore
          if (units[units.length - 1].ProductID == element.ProductID) {
            //@ts-ignore
            const temp = units[units.length - 1].Units * element.Price;
            cash = totalCost + temp;
          }
        });
        setTotalCost(cash);

        const temp = products;
        setnewProducts(products);
        setProducts(temp);
      }
    }
  }, [units]);

  const headerItem = () => {
    return (
      <View style={styles.headerView}>
        <View style={{width: '15%'}}>
          <Text style={[styles.headerText]}>Code</Text>
        </View>
        <View style={{width: '23%'}}>
          <Text style={[styles.headerText]}>Name</Text>
        </View>
        <View style={{width: '13%'}}>
          <Text style={[styles.headerText]}>Exist</Text>
        </View>
        <View style={{width: '14%'}}>
          <Text style={[styles.headerText]}>Cases</Text>
        </View>
        <View style={{width: '12%'}}>
          <Text style={[styles.headerText]}>Exist</Text>
        </View>
        <View style={{width: '17%'}}>
          <Text style={[styles.headerText]}>Units</Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item}: any) => {
    return (
      <ScrollView>
        <View
          style={{
            marginHorizontal: moderateScale(10),
            marginBottom: moderateScale(5),
            backgroundColor: 'white',
            borderColor: '#009387',
            borderWidth: 1,
            borderRadius: 18,
            elevation: 20,
            paddingVertical: moderateScale(5),
            paddingRight: moderateScale(5),
          }}>
          <View style={styles.itemView}>
            <View style={{width: '15%'}}>
              <Text style={{marginLeft: moderateScale(10), color: 'black'}}>
                {item.ProductID}
              </Text>
            </View>
            <View style={{width: '28%'}}>
              <Text style={{color: 'black'}}>{item.Name}</Text>
            </View>
            <View style={{width: '10%'}}>
              <Text style={{color: 'black'}}>{item.Cases}</Text>
            </View>
            <View style={{width: '17%'}}>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: moderateScale(5),
                  paddingVertical: 0,
                  paddingLeft: moderateScale(14),
                  paddingRight: 0,
                  marginLeft: moderateScale(5),
                  marginRight: moderateScale(18),
                  borderColor: 'black',
                }}
                placeholder={'0'}
                onChangeText={(item: any) => setInput(item)}
                onSubmitEditing={() => addCases(item)}></TextInput>
            </View>
            <View style={{width: '7%'}}>
              <Text style={{color: 'black'}}>{item.Units}</Text>
            </View>
            <View style={{width: '17%'}}>
              <TextInput
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: moderateScale(5),
                  paddingVertical: 0,
                  paddingLeft: moderateScale(14),
                  paddingRight: 0,
                  marginLeft: moderateScale(5),
                  marginRight: moderateScale(18),
                  borderColor: 'black',
                }}
                placeholder={'0'}
                onChangeText={(item: any) => setInput(item)}
                onSubmitEditing={() => addUnits(item)}></TextInput>
            </View>
            <View style={styles.infoButtonView}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Information',
                    `Per Case "${item.UnitsPerCase.toString()}" Units`,
                  )
                }>
                <Image
                  source={require('../components/Images/info.png')}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={styles.toggleButtonView}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{width: '70%', paddingLeft: moderateScale(20)}}>
            <Text style={{color: '#fff'}}>Sales</Text>
            <Text style={{color: '#fff'}}>Total Amount : {totalCost}</Text>
          </View>
          <View
            style={{
              width: '30%',
              paddingRight: moderateScale(30),
              paddingTop: moderateScale(5),
            }}>
            <Switch
              trackColor={{false: '#e9f7f6', true: '#e9f7f6'}}
              thumbColor={isEnabled ? '#009390' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.85,
          backgroundColor: 'white',
          marginTop: moderateScale(10),
        }}>
        {isEnabled ? (
          <View>
            <View style={{alignItems: 'center'}}>
              <TextInput
                style={styles.searchTextBar}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="   Search by Product Code"
              />
            </View>
            <ScrollView>
              <View>
                <FlatList
                  style={{marginTop: moderateScale(10)}}
                  data={filteredContact ? filteredContact : props?.Inventory}
                  renderItem={renderItem}
                  ListHeaderComponent={headerItem}
                />
              </View>
              <View style={{flex: 0.1, backgroundColor: 'white'}}>
                <TouchableOpacity
                  onPress={() => setInvoice()}
                  style={styles.generateInvoiceButton}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: scale(15),
                    }}>
                    Generate Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : (
          <Text></Text>
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
    Inventory: state.Inventory,
    Customer: state.Customer,
    Invoice: state.Invoice,
    Products: state.Products,
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
  async setProducts(action: any) {
    await dispatch({
      type: 'SET_PRODUCTS',
      id: action.id,
    });
  },
  async setStartTime(action: any) {
    console.log('checing set startime');
    await dispatch({
      type: 'SET_START_TIME',
      id: action.id,
      customerId: action.customerId,
    });
  },
  async setInvoice(action: any) {
    await dispatch({
      type: 'UPDATE_INVOICE',
      id: action.id,
      customerId: action.customerId,
      products: action.products,
      products1: action.products1,
      Trip: action.Trip,
      BillNo: action.BillNo,
      TotalCost: action.TotalCost,
    });
  },
  async setVisit(action: any) {
    console.log('checing set visit');
    await dispatch({
      type: 'SET_VISITED',
      id: action.id,
      customerId: action.customerId,
      Trip: action.Trip,
    });
  },
  async getInvoice(action: any) {
    await dispatch({
      type: 'LOAD_INVOICE',
      id: action.id,
      customerId: action.customerId,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(unLoadScreen);

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    left: moderateScale(3),
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    height: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: moderateScale(3),
    margin: moderateScale(10),
    marginTop: 0,
  },
  toggleButtonView: {
    backgroundColor: '#0fd1ad',
    flexDirection: 'row',
    marginHorizontal: moderateScale(20),
    borderRadius: 10,
    marginTop: moderateScale(10),
    padding: moderateScale(10),
  },
  generateInvoiceButton: {
    alignItems: 'center',
    marginTop: moderateScale(10),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: moderateScale(80),
    padding: moderateScale(5),
    backgroundColor: '#0fd1ad',
  },
  searchTextBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: moderateScale(10),
    padding: moderateScale(5),
    paddingLeft: moderateScale(80),
    paddingRight: moderateScale(20),
    borderWidth: 2,
    height: verticalScale(45),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  infoButtonView:{
                borderWidth: 1,
                borderColor: 'black',
                marginRight: moderateScale(30),
                borderRadius: 100,
              },
});
