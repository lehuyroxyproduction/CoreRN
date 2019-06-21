import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { AppRow, AppColumn } from '.';

const DeviceDetailRow = ({viewLeft, viewRight}) => {
    return (
        <AppRow>    
            <AppColumn style={{flex: 40, justifyContent: 'center'}}>
                {viewLeft}
            </AppColumn>
            <AppColumn style={{flex: 60, justifyContent: 'center'}}>
                {viewRight}
            </AppColumn>
        </AppRow>
    )
}

export {DeviceDetailRow}