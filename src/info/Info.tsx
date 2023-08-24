import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect, Connect, useSelector} from 'react-redux';
import {Card, Title} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import { scale, moderateScale, verticalScale} from '../components/Scale'
import {styles} from './style'
const unLoadScreen = (props: any) => {
  const {navigation} = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContact, setFilteredContact] = useState(props?.Information);
  const [isAPIbusy, setAPIBusy] = useState(false);

  useEffect(() => {
    if (props.Information == undefined || props.Information == '') {
    } else {
      const newContacts = props?.Information?.filter(
        (contact: {CustomerID: string}) =>
          contact.CustomerID.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredContact(newContacts);  
    }
  }, [searchTerm]);

  const getInformation = async () => {
    await props.getInfo({
      id: props.data.user.uid,
      trip:props.Trip.TripId
    });
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    try {
      getInformation()
      setAPIBusy(true);
    } catch (error) {
      console.log(error);
    }
    
  }, [isFocused]);

  useEffect(() => {
    const data = async () => {
      try {
        props.getInfo({
          id: props.data.user.uid,
          trip:props.Trip.TripId
        });
        await getInformation()
        setAPIBusy(true);
      } catch (error) {
        console.log(error);
      }
    }
    data()
  }, []);

  return (
    <View style={styles.viewMain}>
      <TextInput
        style={styles.textInputDesign}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search by Name"
      />
      <View
        style={{
          flex: 1,
          margin: moderateScale(2),
          borderRadius: 10,
        }}>
        <View style={{height: 10}} />
        {filteredContact == undefined ? (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" />
            <Text>Loading Information...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredContact ? filteredContact : props?.Information}
            renderItem={({item}) => (
              <Card style={styles.cardMainButtonContainer}>
                <Card.Content style={styles.cardButtonContent}>
                  <View>
                    <View>
                      <View style={{width: '100%', flexDirection: 'row'}}>
                        <View style={{width: '35%'}}>
                          <Text style={styles.buttonText}>CustomerID</Text>
                        </View>
                        <View style={{width: '65%'}}>
                          <Text style={styles.dataText}>
                            : {item.CustomerID}
                          </Text>
                        </View>
                      </View>
                      {item?.BillNo == undefined ? null : (
                        <View style={{width: '100%', flexDirection: 'row'}}>
                          <View style={{width: '35%'}}>
                            <Text style={styles.buttonText}>Invoice No. </Text>
                          </View>
                          <View style={{width: '65%'}}>
                            <Text style={styles.dataText}>: {item.BillNo}</Text>
                          </View>
                        </View>
                      )}
                      {item?.TotalCost == undefined ? null : (
                        <View style={{width: '100%', flexDirection: 'row'}}>
                          <View style={{width: '35%'}}>
                            <Text style={styles.buttonText}>Amount</Text>
                          </View>
                          <View style={{width: '65%'}}>
                            <Text style={styles.dataText}>
                              : {'₹ ' + item.TotalCost}
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={{width: '100%', flexDirection: 'row'}}>
                        <View style={{width: '35%'}}>
                          <Text style={styles.buttonText}>Visit Date</Text>
                        </View>
                        <View style={{width: '65%'}}>
                          {item?.startDate == '' ||
                          item.startDate == undefined ? (
                            <Text></Text>
                          ) : (
                            <Text style={styles.dataText}>
                              : {item?.startDate}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{width: '100%', flexDirection: 'row'}}>
                        <View style={{width: '35%'}}>
                          <Text style={styles.buttonText}>End Time</Text>
                        </View>
                        <View style={{width: '65%'}}>
                          {item?.EndDate == '' || item?.EndDate == undefined ? (
                            <Text style={{marginTop: 3}}>
                              : Bill is Not Generated
                            </Text>
                          ) : (
                            <Text style={styles.dataText}>
                              : {item?.EndDate}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          />
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
    Invoice: state.Invoice,
    Information: state.Information,
    Trip: state.Trip,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getInfo(action: any) {
    await dispatch({
      type: 'LOAD_INFO',
      id: action.id,
      trip:action.trip
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(unLoadScreen);