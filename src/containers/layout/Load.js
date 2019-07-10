import React, { Component } from 'react'
import { ActivityIndicator,StyleSheet } from 'react-native'
import { isAndroid } from '../../constants/constants'
import { View } from '../';

export interface LoadingProps {
  animating?:  Boolean;
  color:String ;
  size: String ;
  hidesWhenStopped : Boolean;
}

export const Loader = (props:LoadingProps) => {

  const {
    animating,
    color,
    size,
    hidesWhenStopped
  }=props
  
  /** 
   * Check size just enter small or large on ios , 
   * and parseInt if value differents small or large on Android 
   * **/
  
  let isSize = size
  size == 'small' || size == 'large' ? 
    isSize = size :
    isSize = parseInt(size)

  if(!isAndroid){
    if(isSize === 'small' || isSize === 'large'){
      isSize = isSize
    }else{
      isSize = "small" 
      console.log("Your size just use on android")
    }
  }

  return(
    <View style={styles.loaderContainer} >
      {
        isAndroid ? 
        <ActivityIndicator 
          size={isSize} 
          color={color} 
          animating={animating}
          />
        :
        <ActivityIndicator 
          size={isSize} 
          color={color} 
          animating={animating}
          hidesWhenStopped={hidesWhenStopped}
          />
      }
    </View>
  )
} 
const colors = isAndroid ? 'dark cyan' : 'gray'

Loader.defaultProps = {
  animating:true,
  color:colors,
  size:'small'
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex:1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})