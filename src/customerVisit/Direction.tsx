import React, { Component } from 'react';
import { Dimensions, StyleSheet,View,Text } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 17;
const LONGITUDE = 78;
const LATITUDE_DELTA = 17;
const LONGITUDE_DELTA = 78;

const GOOGLE_MAPS_APIKEY = '…';

class Direction extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 17.5065,
          longitude: 78.4213,
        },
        {
          latitude: 17.4933,
          longitude: 78.3914,
        },
        {
          latitude: 17.5169,
          longitude: 78.3428,
        },
      ],
      mapView : null
    };

    // this.
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.state.mapView = c}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={'AIzaSyBT4eIW5KQoalNqar5cfPpAfnvpcpwLBGM'}
            strokeWidth={3}
            strokeColor="blue"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              this.state.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}

export default Direction;
