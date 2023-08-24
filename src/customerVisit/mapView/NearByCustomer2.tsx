import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import NearByCustomers from './NearByCustomers';
import {Image} from 'react-native-animatable';
import {scale, moderateScale, verticalScale} from '../../components/Scale';



const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

class nearByCustomers extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 0,
        lng: 0,
      },
      searchedLocation: {
        lat: 0,
        lng: 0,
      },
      nearByPlaces: [],
      nearByPlacesCoordinates: [],
      nearByPlacesCustomer: [],
      companyCusCoor: [],
    };
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }
  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): Promise<void> {
    if (prevState.searchedLocation.lat !== this.state.searchedLocation.lat) {
      await this.props.getGoogelMapNearBy({
        lat: this.state.searchedLocation.lat,
        lng: this.state.searchedLocation.lng,
        id: this.props.data.user.uid,
      });
      await this.props.getContant({id: props.data.user.uid});
    }
  }

  showCustomers = async () => {
    
    const nearByCustomer: any[] | PromiseLike<any[]> = [];
    const nearByCustomerCoor: any[] | PromiseLike<any[]> = [];
    const companyCusCoor: any[] | PromiseLike<any[]> = [];

    this?.props?.nearByCustomers.forEach((placePlaceId: any) => {
      var c = 0;
      this?.props?.Customer.forEach((customerPlaceId: any) => {
        if (
          customerPlaceId.coordinates.latitude ==
            placePlaceId.coordinate.latitude &&
          customerPlaceId.coordinates.longitude ==
            placePlaceId.coordinate.longitude
        ) {
          nearByCustomer.push(customerPlaceId);
          companyCusCoor.push(customerPlaceId.coordinates);
          c = 1;
        }
      });
      if (c == 0) {
        nearByCustomerCoor.push(placePlaceId);
      }
    });

    this.setState({nearByPlaces: {nearByCustomer}});
    this.setState({nearByPlacesCoordinates: {nearByCustomerCoor}});
    this.setState({companyCusCoor: companyCusCoor});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '92%'}}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                this.setState({
                  searchedLocation: {
                    lat: details?.geometry?.location.lat,
                    lng: details?.geometry?.location.lng,
                  },
                });
              }}
              query={{
                key: 'AIzaSyBT4eIW5KQoalNqar5cfPpAfnvpcpwLBGM',
                language: 'en',
              }}
              styles={styles}
            />
          </View>
          <View
            style={{
              zIndex: 999,
              position: 'absolute',
              padding: moderateScale(5),
              marginLeft: moderateScale(310),
              marginTop: moderateScale(7),
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
              width:"10%"
            }}>
            <TouchableOpacity onPress={() => this.showCustomers()}>
              <Image
                style={{height: 25, width: 25}}
                source={require('../../components/Images/search.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this?.state?.nearByPlaces?.nearByCustomer != undefined ||
        this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor !=
          undefined ? (
          this?.state?.nearByPlaces?.nearByCustomer?.length != 0 ||
          this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor?.length !=
            0 ? (
            <NearByCustomers
              data={this?.state?.nearByPlaces?.nearByCustomer}
              searchedLocation={this.state.searchedLocation}
              navigation={this.props.navigation}
              nearByCusCoor={
                this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor
              }
              companyCusCoor={this?.state?.companyCusCoor}></NearByCustomers>
          ) : (
            <View style={{flex: 1, width: '100%'}}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{flex: 1, marginBottom: -60}}
                region={{
                  latitude: this.state.currentLocation.lat,
                  longitude: this.state.currentLocation.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                // fullscreenControl={false}
                getMarkersFrames={false}>
                <Marker
                  coordinate={{
                    latitude: this.state.currentLocation.lat,
                    longitude: this.state.currentLocation.lng,
                  }}
                  title={'My Location'}
                  description={'Its your location'}
                  onPress={() => Alert.alert('this is alert')}></Marker>
                <Marker
                  coordinate={{
                    latitude: this.state.searchedLocation.lat,
                    longitude: this.state.searchedLocation.lng,
                  }}
                  title={'Searched Location'}
                  description={'location that you searched for'}></Marker>
                {this?.state?.nearByPlaces?.nearByCustomer ||
                this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor
                  ? this?.state?.nearByPlaces?.nearByCustomer?.map(
                      (marker, index) => {
                        return (
                          <Marker
                            key={index}
                            coordinate={{
                              latitude: marker?.place.coordinates?.latitude,
                              longitude: marker?.place.coordinates?.longitude,
                            }}
                            title={marker.Address}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'CoustemerDetails',
                                {
                                  id: {Id: marker.CustomerID},
                                },
                              );
                            }}></Marker>
                        );
                      },
                    ) &&
                    this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor?.map(
                      (marker, index) => {
                        return (
                          <Marker
                            key={index}
                            coordinate={{
                              latitude: marker?.place.coordinate?.latitude,
                              longitude: marker?.place.coordinate?.longitude,
                            }}
                            title={marker.Address}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'CoustemerDetails',
                                {
                                  id: {Id: marker.CustomerID},
                                },
                              );
                            }}></Marker>
                        );
                      },
                    )
                  : null}
                {this?.state?.nearByPlaces?.nearByCustomer ||
                this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor
                  ? this?.state?.nearByPlaces?.nearByCustomer?.map(
                      (marker, index) => {
                        return (
                          <Marker
                            key={index}
                            coordinate={{
                              latitude: marker?.place.coordinates?.latitude,
                              longitude: marker?.place.coordinates?.longitude,
                            }}
                            title={marker.Address}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'CoustemerDetails',
                                {
                                  id: {Id: marker.CustomerID},
                                },
                              );
                            }}></Marker>
                        );
                      },
                    ) &&
                    this?.state?.nearByPlacesCoordinates?.nearByCustomerCoor?.map(
                      (marker, index) => {
                        return (
                          <Marker
                            key={index}
                            coordinate={{
                              latitude: marker?.place.coordinate?.latitude,
                              longitude: marker?.place.coordinate?.longitude,
                            }}
                            title={marker.Address}
                            onPress={() => {
                              this.props.navigation.navigate(
                                'CoustemerDetails',
                                {
                                  id: {Id: marker.CustomerID},
                                },
                              );
                            }}></Marker>
                        );
                      },
                    )
                  : null}
              </MapView>
            </View>
          )
        ) : (
          <View style={{flex: 1, width: '100%'}}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1, marginBottom: -60}}
              region={{
                latitude: this.state.currentLocation.lat,
                longitude: this.state.currentLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              // fullscreenControl={false}
              getMarkersFrames={false}>
              <Marker
                coordinate={{
                  latitude: this.state.currentLocation.lat,
                  longitude: this.state.currentLocation.lng,
                }}
                title={'My Location'}
                description={'Its your location'}
                onPress={() => Alert.alert('this is alert')}></Marker>
            </MapView>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    nearByCustomers: state.nearByCustomers,
    Customer: state.Customer
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  async getGoogelMapNearBy(action: any) {
    await dispatch({
      type: 'GET_GOOGLE_MAP_APICALL',
      lat: action.lat,
      lng: action.lng,
      id: action.id,
    });
  },
  async getContant(action: any) {
    await dispatch({
      type: 'LOAD_CUSTOMER',
      id: action.id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(nearByCustomers);

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: '80%',
    marginLeft: '10%',
    marginTop: 5,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    zIndex: 999,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  listView: {
    top: 45.5,
    zIndex: 10,
    position: 'absolute',
    color: 'black',
    backgroundColor: 'white',
    width: '80%',
    marginLeft: '9%',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightblue',
  },
  description: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    maxWidth: '80%',
  },
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
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    // flex: 3,
    // width: '100%',
    // height: '100%',
    alignSelf: 'center',
    height: '50%',
    width: '100%',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
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
