import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import { Devices } from '../constants/constants.js';

// #region Constants
const padding = 10 * Devices.displayScale;
const borderColor = 'rgba(0,0,0,0.2)';
const modalMaxHeight = '40%';
// #endregion

class ComponentModalFlatList extends Component {

    // #region Component Lifecycle
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { title, dataList } = this.props;
        return (
            <Modal 
                ref={'modal'} 
                style={styles.modal} 
                position={'bottom'} 
                swipeToClose={false} 
                backButtonClose={true}
            >
                <View style={styles.flatListHeader} >
                    <Text style={styles.flatListHeaderText} >{title}</Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={dataList}
                    extraData={this.props}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={this.renderItem}
                />
                <TouchableOpacity 
                    style={styles.flatListFooter}
                    onPress={() => this.close()}
                >
                    <Text style={styles.flatListFooterText} >{I18n.t('Cancel')}</Text>
                </TouchableOpacity>
            </Modal>
        );
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    // #endregion

    // #region Components
    renderItem = ({item, index}) => {
        const { data, onPressData } = this.props;
        return (
            <TouchableOpacity
                style={styles.renderItemContainer}
                onPress={() => onPressData ? onPressData(item) : null } 
            >
                <Text style={item.id_location === data.id_location ? styles.renderItemBoldText : styles.renderItemText} >{item.building_name}</Text>
            </TouchableOpacity>
        );
    }
    // #endregion

    // #region Methods
    open = () => {
        if (this.refs.modal) {
            this.refs.modal.open();
        }
    }

    close = () => {
        if (this.refs.modal) {
            this.refs.modal.close();
        }
    }
    // #endregion

}

// #region Stylesheet
const styles = StyleSheet.create({
    
    modal: {
        maxHeight: modalMaxHeight,
        backgroundColor: 'white'
    },

    flatList: {
        flex: 1,
    },

    flatListHeader: {
        paddingVertical: padding * 1.5,
        paddingHorizontal: padding * 2,
        width: Devices.width, 
        borderBottomWidth: 1 * Devices.displayScale,
        borderColor: borderColor,
    },

    flatListFooter: {
        paddingVertical: padding * 1.5,
        paddingHorizontal: padding * 2,
        width: Devices.width, 
        borderTopWidth: 1 * Devices.displayScale,
        borderColor: borderColor,
    },

    flatListHeaderText: {
        fontSize: 14 * Devices.displayScale,
        color: 'gray',
    },

    flatListFooterText: {
        fontSize: 14 * Devices.displayScale,
        color: 'black',
    },

    renderItemContainer: {
        marginVertical: padding,
    },

    renderItemText: {
        paddingHorizontal: padding * 2,
        fontSize: 14 * Devices.displayScale,
        color: 'black',
    },

    renderItemBoldText: {
        paddingHorizontal: padding * 2,
        fontSize: 14 * Devices.displayScale,
        fontWeight: 'bold',
        color: 'black',
    },

})
// #endregion

// #region PropTypes
ComponentModalFlatList.propTypes = {
    title: PropTypes.string,
    dataList: PropTypes.any,
    data: PropTypes.any,
    onPressData: PropTypes.func,
};
// #endregion

export default ComponentModalFlatList;