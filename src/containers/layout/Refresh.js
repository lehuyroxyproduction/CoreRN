// import React, { Component } from 'react'
// import { RefreshControl } from 'react-native'

// interface RefreshIOS{
//   /**
//    * The color of the refresh indicator.
//    */
//   tintColor?: string;

//   /**
//    * The title displayed under the refresh indicator.
//    */
//   title?: string;

//   /**
//    * Title color.
//    */
//   titleColor?: string;
//   /**
//    * The colors (at least one) that will be used to draw the refresh indicator.
//    */
// }
// interface RefreshAndroid{
//   /**
//    * The colors (at least one) that will be used to draw the refresh indicator.
//    */
//   colors?: string[];

//   /**
//    * Whether the pull to refresh functionality is enabled.
//    */
//   enabled?: Boolean;

//   /**
//    * The background color of the refresh indicator.
//    */
//   progressBackgroundColor?: string;

//   /**
//    * Size of the refresh indicator, see RefreshControl.SIZE.
//    */
//   size?: number;

//   /**
//    * Progress view top offset
//    * @platform android
//    */
//   progressViewOffset?: number;
// }

// export interface RefreshProps extends RefreshIOS,RefreshAndroid {
//   onRefresh?: ()=>void;
//   refreshing: Boolean;
// }

// export const Refresh = (props: RefreshProps) => {

//   const {
//     onRefresh,
//     refreshing,
//     tintColor,
//     title,
//     titleColor,
//     colors,
//     enabled,
//     progressBackgroundColor,
//     progressViewOffset,
//     size,
//   }=props
  
//   return(
//     <RefreshControl
//       onRefresh={onRefresh} 
//       refreshing={refreshing}
//       colors={colors}
//       enabled={enabled}
//       size={size}
//       progressBackgroundColor={progressBackgroundColor}
//       progressViewOffset={progressViewOffset}
//       tintColor={tintColor}
//       title={title}
//       titleColor={titleColor}
//       />
//   )
// } 

// Refresh.defaultProps = {  onRefresh:()=>{},
//   refreshing:true,
//   tintColor:'gray',
//   title:'Refreshing',
//   titleColor:'black',
//   colors:['black'],
//   progressBackgroundColor:'white',
//   // progressViewOffset:'5',
  
// }
