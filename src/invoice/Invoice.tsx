import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {connect} from 'react-redux';

import {PDFfile} from '../components/extraDocs/Temp';
import {scale, moderateScale, verticalScale} from '../components/Scale';


const Invoice = (props: any) => {

  const [isAPIbusy, setAPIBusy] = useState(true);

  const generateInvoice = async () => {
    await props.getInvoice({
      id: props.data.user.uid,
      customerId: props.route.params.customerProps.Id,
      trip: props.Trip.TripId,
    });
    await props.getCustomerDetails({
      id: props.data.user.uid,
      customerId: props.route.params.customerProps.Id,
    });

    calTotal();
    setAPIBusy(false);
  };

  // getCustomer()
  useEffect(() => {
    generateInvoice();
  }, []);

  const [total, setTotal] = useState(0);

  const date = new Date().toLocaleString();
  const billDate = new Date().toString();
  const billDate2 =
    props.route.params.customerProps.Id.slice(0, 3) +
    billDate.slice(11, 13) +
    billDate.slice(16, 18) +
    billDate.slice(19, 21);

  const [invoiceData, setInvoiceData] = useState(props?.Invoice?.products);

  const calTotal = () => {
    if (props?.Invoice != undefined) {
      let cash = 0;
      props?.Invoice?.products.forEach((element: any) => {
        cash =
          cash +
          parseInt(element.Price) *
            parseFloat(`${element.Cases}.${element.Units})`);
      });
      setTotal(cash);
    } else {
    }
  };
  const printPDF = async () => {
    let Html = PDFfile(
      props?.Invoice?.CustomerID,
      billDate2,
      props?.CustomerDetail?.Name,
      props?.CustomerDetail?.Phone,
      date,
      props?.CustomerDetail?.Address,
      props?.Invoice?.products,
      props?.Invoice?.TotalCost,
    );
    const results: any = await RNHTMLtoPDF.convert({
      html: Html,
      fileName: 'test',
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          margin: moderateScale(10),
          borderColor: 'grey',
          borderWidth: 3,
          borderRadius: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: moderateScale(15),
            backgroundColor: '#fff',
            borderTopEndRadius: moderateScale(17),
            borderTopLeftRadius: moderateScale(17),
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
            Invoice
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            width: '100%',
          }}></View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '56%',
              marginLeft: moderateScale(10),
              marginTop: moderateScale(20),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: '33%', color: 'black', fontWeight: 'bold'}}>
                Bill No
              </Text>
              <Text style={{width: '55%', color: 'black'}}>: {billDate2}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: '33%', color: 'black', fontWeight: 'bold'}}>
                Name
              </Text>
              <Text style={{color: 'black'}}>
                : {props?.CustomerDetail?.Name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: '33%', color: 'black', fontWeight: 'bold'}}>
                PhoneNo
              </Text>
              <Text style={{color: 'black'}}>
                : {props?.CustomerDetail?.Phone}{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '40%',
              marginRight: moderateScale(4),
              marginTop: moderateScale(20),
            }}>
            <Text style={{color: 'black'}}>Date:{date.slice(0, 10)}</Text>
            <Text style={{color: 'black'}}>
              Time :{date.slice(11, 16)}
              {date.slice(19, 23)}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#0fd1ad',
            marginTop: moderateScale(25),
            flexDirection: 'row',
            paddingVertical: moderateScale(3),
          }}>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '7%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            Id
          </Text>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '25%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            Item Name
          </Text>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '12%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            Price
          </Text>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '10%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            Case
          </Text>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '9%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            unit
          </Text>
          <Text
            style={{
              marginLeft: moderateScale(10),
              width: '20%',
              fontWeight: '700',
              fontSize: scale(14.5),
              color: '#fff',
            }}>
            Total
          </Text>
        </View>
        <View>
          <FlatList
            data={invoiceData ? invoiceData : props?.Invoice?.products}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '7%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.ProductID}
                </Text>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '25%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.Name}
                </Text>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '15%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.Price}
                </Text>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '8%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.Cases}
                </Text>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '7%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.Units}
                </Text>
                <Text
                  style={{
                    marginLeft: moderateScale(10),
                    width: '25%',
                    marginVertical: moderateScale(3),
                    color: 'black',
                  }}>
                  {item.Price *
                    (parseInt(item.Cases) * item.UnitsPerCase +
                      parseInt(item.Units))}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            marginTop: moderateScale(40),
            marginLeft: moderateScale(140),
          }}>
          <Text style={{color: 'black', fontSize: scale(16)}}>
            Grand Total : ₹ {props?.Invoice?.TotalCost}
          </Text>
          <Text></Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              margin: moderateScale(6),
              backgroundColor: '#0fd1ad',
              marginHorizontal: moderateScale(100),
              alignItems: 'center',
              padding: moderateScale(5),
              borderRadius: 10,
              marginBottom: moderateScale(10),
            }}
            onPress={() => printPDF()}>
            <Text style={{color: 'black', fontSize: scale(15)}}>Print Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            margin: moderateScale(5),
            backgroundColor: '#0fd1ad',
            marginHorizontal: moderateScale(100),
            alignItems: 'center',
            padding: moderateScale(5),
            borderRadius: 10,
            marginBottom: moderateScale(10),
          }}
          onPress={() => props.navigation.navigate('Customer Visit')}>
          <Text style={{color: 'black', fontSize: scale(15)}}>Continue Sales</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    loginSuccess: state.loginSuccess,
    Customer: state.Customer,
    CustomerProducts: state.CustomerProducts,
    Invoice: state.Invoice,
    CustomerDetail: state.CustomerDetail,
    Trip: state.Trip,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getInvoice(action: any) {
    await dispatch({
      type: 'LOAD_INVOICE',
      id: action.id,
      customerId: action.customerId,
      trip: action.trip,
    });
  },
  async getCustomerDetails(action: any) {
    await dispatch({
      type: 'GET_CUSTOMER_DETAIL',
      id: action.id,
      customerId: action.customerId,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
