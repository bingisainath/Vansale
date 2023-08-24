import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useTheme} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';



const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const NearByCustomers = (props: any) => {

  const initialMapState = {
    data: props.data,
    region: {
      latitude: 17,
      longitude: 78,
      latitudeDelta: 17,
      longitudeDelta: 78,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= props.data.length) {
        index = props.data.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      //@ts-ignore
      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = props.data[index];
          //@ts-ignore
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = props.data.map((marker:any, index:any) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData:any) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    //@ts-ignore
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={{
          latitude: props.searchedLocation.lat,
          longitude: props.searchedLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
      >
        {props?.nearByCusCoor?.map((marker:any, index:any) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker?.coordinate?.latitude,
                longitude: marker?.coordinate?.longitude,
              }}
              pinColor={'green'}
              title={marker.placeName}
              ></Marker>
          );
        })}
        {props?.data?.map((marker:any, index:any) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker?.coordinates?.latitude,
                longitude: marker?.coordinates?.longitude,
              }}
              title={marker.Name}
              description={marker.Address}
              onPress={(e)=>onMarkerPress(e)}
              >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../components/Images/map_marker.png')}
                  //@ts-ignore
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
        {props.data.length >= 2 && (
          <MapViewDirections
            origin={props.data[1].coordinates}
            waypoints={props.companyCusCoor}
            destination={props.data[props.data.length - 1].coordinates}
            apikey={'AIzaSyBT4eIW5KQoalNqar5cfPpAfnvpcpwLBGM'}
            strokeWidth={3}
            strokeColor="blue"
            optimizeWaypoints={true}
            onError={errorMessage => {
              console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {props.data.map((marker:any, index:any) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CoustemerDetails', {
                id: {Id: marker.CustomerID},
              });
            }}>
            <View
              style={[
                styles.card,
                {borderColor: 'black', borderWidth: 3, borderRadius: 10},
              ]}
              key={index}>
              <Image
                source={{uri: marker.Image}}
                resizeMode="cover"
                //@ts-ignore
                style={styles.cardImage}
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Customer ID: {marker.CustomerID}
                </Text>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Email: {marker.Email}
                </Text>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Name: {marker.Name}
                </Text>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Address : {marker.Address}
                </Text>
                <Text></Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default NearByCustomers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,//@ts-ignore
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderWidth:3,
    borderColor:'red'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '80%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
    color:'#666d75'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
