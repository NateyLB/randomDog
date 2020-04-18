import React from 'react';
import { connect } from 'react-redux';

import Video from 'react-native-video';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';


import { fetchDog } from '../actions/dogAction.js'

import { Alert, View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const RandomDog = props =>{

    //checks if media type is image or video
    const mediaCheck = ()=>{
        if (props.dog.url.slice(-3)!='mp4' && props.dog.url.slice(-4)!='webm'){
            return props.dog.url.length ? 
            <Image source={{uri: props.dog.url}}
       style={styles.dogImg} />:
            <Text style={styles.clickFor}>Click button for random dog!</Text>
        }
        return props.dog.url.length ? 
        <Video source={{uri: props.dog.url}}   
    
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       repeat={true}
       style={styles.backgroundVideo}
        />
         :
       <Text style={styles.clickFor}>Click button for random dog!</Text>
    };

    _callback = res => {
      console.log('Response: ', res);
    };
  
    _setWallpaper = () => {
     ManageWallpaper.setWallpaper(
        {
          uri: props.dog.url,
        },
        this._callback,
        TYPE.HOME,
      );
    };

    // const _setWallpaper = () =>{
    //   WallPaperManager.setWallPaper({uri: props.dog.url}, (res)=> console.log(res));
    // };

    const createFourButtonAlert = () =>
    Alert.alert(
      "Add To Wallpaper",
      "Choose which screen you would like to use this picture for",
      [
        {
          text: "Lock", onPress: () => _setWallpaper()},
        { text: "Home", onPress: () => _setWallpaper() },
        { text: "Both", onPress: () => _setWallpaper() },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

    return(
        <View style={styles.dogCard}>
            {mediaCheck()}
            {props.dog.error.length ? <Text>{props.dog.error}</Text> : <Text></Text>}
            <View style={styles.buttonContainer}>
            {props.dog.url.length? <Button onPress={()=>createFourButtonAlert()} title="Use As Wallpaper" style={styles.button} />:<></> }
            <Button onPress={()=>props.fetchDog()} title="Random Dog" style={styles.button}/>
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgHeight = windowHeight - 125

//data from reducer
const mapStateToProps = state => {
    return {
      dog: state.dogReducer
    };
  };
  
  export default connect(
  mapStateToProps,
  {fetchDog}
  )(RandomDog)

  const styles = StyleSheet.create({
    backgroundVideo: {
        width: windowWidth, 
        height: imgHeight,
        marginTop:33
      },
      clickFor:{
          fontWeight: 'bold',
          fontSize:30,
          marginTop: 400,
          marginBottom:347
      },
      button:{

      },
      dogCard:{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems:'center'
      },
      dogImg:{
          width: windowWidth, 
          height: imgHeight,
          marginTop:33
        },
        buttonContainer:{
          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: windowWidth

        }
  });