import React from 'react';
import { connect } from 'react-redux';

import Video from 'react-native-video';
//import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';


import { fetchDog } from '../actions/dogAction.js'

import { Alert, View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';


const RandomDog = props => {

  const createFourButtonAlert = () =>
    Alert.alert(
      "Add To Wallpaper",
      "Choose which screen you would like to use this picture for",
      [
        {text: "Lock", onPress: () => _setWallpaper(TYPE.LOCK)},
        { text: "Home", onPress: () => _setWallpaper(TYPE.HOME) },
        { text: "Both", onPress: () => _setWallpaper(TYPE.BOTH) },
        Platform.OS=='ios'?{
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }:<></>
      ],
      { cancelable: true }
    );

  //checks if media type is image or video
  const mediaCheck = () => {
    if (props.dog.url.slice(-3) != 'mp4' && props.dog.url.slice(-4) != 'webm') {
      return props.dog.url.length ?
        <>
          <TouchableOpacity onPress={() => props.fetchDog()}>
            <Image source={{ uri: props.dog.url }} style={styles.dogImg} />
          </TouchableOpacity>
          <Button onPress={() => createFourButtonAlert()} title="Set Wallpaper" />
        </> :
        <>
          <Text style={styles.clickFor}>Click button for random dog!</Text>
          <Button onPress={() => props.fetchDog()} title="Random Dog" style={styles.button} />
        </>
    }
    return (
      <TouchableOpacity onPress={() => props.fetchDog()}>
        <Video source={{ uri: props.dog.url }}

          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onError={this.videoError}               // Callback when video cannot be loaded
          repeat={true}
          style={styles.backgroundVideo}
        />
      </TouchableOpacity>
    )
  };

  _callback = res => {
    console.log('Response: ', res);
  };

  _setWallpaper = (type) => {
    ManageWallpaper.setWallpaper(
      {
        uri: props.dog.url,
      },
      this._callback,
      type,
    );
  };
  return (
    <View style={styles.dogCard}>
      {mediaCheck()}
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var imgHeight = windowHeight -100
console.log(windowHeight,"height");
console.log(windowWidth, "width");
console.log(imgHeight,"img")

//data from reducer
const mapStateToProps = state => {
  return {
    dog: state.dogReducer
  };
};

export default connect(
  mapStateToProps,
  { fetchDog }
)(RandomDog)

const styles = StyleSheet.create({
  backgroundVideo: {
    width: windowWidth,
    height: imgHeight,
    marginTop: Platform.OS=='ios'? windowHeight-863: 0
  },
  clickFor: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: windowHeight-500,
    marginBottom: windowHeight-500
  },
  dogCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dogImg: {
    width: windowWidth,
    height: imgHeight,
    marginTop: Platform.OS=='ios'? windowHeight-863: 0
  },
});