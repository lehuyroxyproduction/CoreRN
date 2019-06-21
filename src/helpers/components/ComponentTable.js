import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DisplayScale } from '../../constants/constants';

const AppColumn = (props) =>{
    return ( 
        <View style={[TableStyle.column, props.style]}> 
            {props.children} 
        </View> 
    )
}

const AppRow = (props) => {
    return ( 
        <View style={[TableStyle.row, props.style]}> 
            {props.children} 
        </View> 
    )
}

const AppTable = ({children, style}) => {
    return (  
        <View style={[TableStyle.table, style]}> 
            {children} 
        </View> 
    )
}


// const AppTable = ({children}) => {
//     return (
//         <AppTable>
//             <AppRow>
//                 <AppColumn>
//                     <AppText>Device ID</AppText>
//                 </AppColumn>
//                 <AppColumn>
//                     <AppText>Device ID</AppText>
//                 </AppColumn>
//             </AppRow>
//         </AppTable>
//     );
// }

const TableStyle = StyleSheet.create({
    table: {
        backgroundColor: '#fff',
        paddingTop: 10 * DisplayScale,
        paddingBottom: 10 * DisplayScale,
        marginBottom: 5 * DisplayScale,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20 * DisplayScale,
        paddingRight: 20 * DisplayScale,
    },
    column: {
        flex: 1,
        paddingTop: 5 * DisplayScale,
        paddingBottom: 5 * DisplayScale,
    }
});

export {AppColumn, AppRow, AppTable, TableStyle};