import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
interface UnloadScreenProps {
  data: any;
}
interface UnloadScreenState {}
class UnloadScreen extends Component<UnloadScreenProps, UnloadScreenState> {
  data: any;
  constructor(props: any) {
    super(props);
    this.data = {
      data: [
        {
          name: 'Phones',
          desc: 'Small',
          cases: '1',
          units: '5',
        },
        {
          name: 'TV',
          desc: 'Medium',
          cases: '2',
          units: '7',
        },
      ],
    };
  }
  headerItem = () => {
    return (
      <View style={styles.headerView}>
        <Text style={[styles.headerText, {flex: 0.25}]}>Code</Text>
        <Text style={[styles.headerText, {flex: 0.25}]}>Desc</Text>

        <Text style={[styles.headerText, {flex: 0.25}]}>Cases</Text>
        <Text style={[styles.headerText, {flex: 0.25}]}>Units</Text>
      </View>
    );
  };
  renderItem = ({item, index}: any) => {
    return (
      <View style={styles.cardView}>
        <View
          style={[
            styles.itemText,
            {
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={{marginLeft: 10}}>{item.name}</Text>
        </View>
        <View
          style={[
            styles.itemText,
            {
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text>{item.desc}</Text>
        </View>
        <View
          style={[
            styles.itemText,
            {
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text>{item.cases}</Text>
        </View>
        <View
          style={[
            styles.itemText,
            {
              flex: 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text>{item.units}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        <View style={{height: 50}} />
        <FlatList
          data={this.data.data}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 35,
  },
  itemText: {color: 'red', alignItems: 'center', justifyContent: 'center'},
  headerText: {
    left: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    borderRadius: 3,
    left: 20,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#009387',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 15,
    top: 10,
  },
  input: {
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginLeft: 50,
    marginRight: 50,
  },
});
export default UnloadScreen;
