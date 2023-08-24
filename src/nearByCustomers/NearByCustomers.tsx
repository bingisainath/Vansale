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

import {styles} from '../customerVisit/Style';


const nearByCustomers = (props:any) => {
    console.log('====================================');
    console.log(props.route.params.item);
    console.log('====================================');
  return (
    <View style={{marginTop: 10, flex: 1}}>
        {/* {isAPIbusy == false && filteredContact != '' ? ( */}
        <FlatList
          data={props.route.params.item}
          renderItem={({item}) => (
            <Card style={styles.cardMainButtonContainer}>
              <Card.Content style={styles.cardButtonContent}>
                <View style={styles.ButtonAlignment}>
                  <View style={styles.ButtonViewText}>
                    <Text style={[styles.buttonText,{fontStyle:'italic',fontWeight:'bold'}]}>{item.CustomerID}</Text>
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
  )
}

export default nearByCustomers