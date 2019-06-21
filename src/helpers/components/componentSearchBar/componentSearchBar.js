import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image'
import { Devices, Colors, DefaultProps } from '../../../constants/constants.js';
import PropTypes from 'prop-types';

//#region Constants
const padding = DefaultProps.defaultPadding;
const iconSize = 30 * Devices.displayScale;
const iconClearContainerWidth = 40 * Devices.displayScale;
const iconClearWidth = 15 * Devices.displayScale;
const imageSize = 25 * Devices.displayScale;
const containerHeight = 60 * Devices.displayScale;
const inputHeight = 32 * Devices.displayScale;
//#endregion

class ComponentSearchBar extends Component {

    //#region Component Lifecycle
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        const { 
            style, 
            placeholderText, 
            inputStyle, 
            shouldShowClearButton, 
            shouldEnableSortIcon, 
            shouldEnableFilterIcon, 
            shouldEnableAddIcon, 
            iconAdd,
            isAscending, 
            isFiltered, 
            value, 
            keyboardType, 
            autoCorrect, 
            returnKeyType, 
            autoCapitalize, 
            onClear, 
            onPressSortIcon, 
            onPressFiltertIcon, 
            onPressAddIcon,
            onChangeText, 
            onSubmit 
        } = this.props;
        return(
            <View style={[styles.container, style]}>
                <View style={styles.search}>
                    <Image style={styles.icon} source={require('../../../assets/images/ic_search.png')} width={imageSize} />
                    <TextInput
                        ref={(ref) => this.textInput = ref}
                        style={styles.searchBar}
                        placeholder={placeholderText}
                        placeholderTextColor='gray'
                        onChangeText={(text) => onChangeText ? onChangeText(text) : null}
                        underlineColorAndroid='transparent'
                        multiline={false}
                        keyboardType={keyboardType}
                        autoCorrect={autoCorrect}
                        value={value}
                        onSubmitEditing={(event) => onSubmit ? onSubmit() : null}
                        returnKeyType={returnKeyType}
                        autoCapitalize={autoCapitalize}
                    />
                    { shouldShowClearButton ?
                        <TouchableOpacity 
                            style={styles.iconClearContainer}
                            onPress={() => {
                                this.textInput.clear(); 
                                onClear ? onClear() : null;
                            }} 
                        >
                            <Image
                                style={styles.iconClear}
                                source={require('../../../assets/images/textinput_clear.png')}
                                width={iconClearWidth}
                            />
                        </TouchableOpacity>
                        : null
                    }
                </View>
                { shouldEnableSortIcon ?
                    <TouchableOpacity 
                        style={[styles.icon, styles.iconLast]}
                        onPress={() => onPressSortIcon ? onPressSortIcon() : null}
                    >
                        <Image
                            source={isAscending ? require('../../../assets/images/icon-asc.png') : require('../../../assets/images/icon-dsc.png')} 
                            width={imageSize} 
                        />
                    </TouchableOpacity>
                    : null
                }
                { shouldEnableFilterIcon ?
                    <TouchableOpacity 
                        style={[styles.icon, styles.iconLast]}
                        onPress={() => onPressFiltertIcon ? onPressFiltertIcon() : null}
                    >
                        <Image
                            style={{tintColor: !isFiltered ? Colors.grayTintColor : Colors.main}}
                            source={require('../../../assets/images/icon_filter.png')} 
                            width={imageSize} 
                        />
                    </TouchableOpacity>
                    : null
                }
                { shouldEnableAddIcon ?
                    <TouchableOpacity 
                        style={[styles.icon, styles.iconLast]}
                        onPress={() => onPressAddIcon ? onPressAddIcon() : null}
                    >
                        <Image
                            source={
                                iconAdd === 'add_key' ? require('../../../assets/images/search_add_key.png') :
                                iconAdd === 'add_device' ? require('../../../assets/images/search_add_device.png') :
                                iconAdd === 'add_room' ? require('../../../assets/images/search_add_room.png') :
                                iconAdd === 'add_user' ? require('../../../assets/images/search_add_user.png') :
                                require('../../../assets/images/search_add_key.png')
                            }
                            width={imageSize} 
                        />
                    </TouchableOpacity>
                    : null
                }
            </View>
        );
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }
    //#endregion

    //#region Methods
    focus() {
        this.textInput.focus();
    }
    //#endregion
};

//#region StyleSheet
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        height: containerHeight,
        borderRadius: 3 * Devices.displayScale,
        borderColor: 'black',
        borderWidth: 0.1 * Devices.displayScale,
        shadowOffset: { width: 0, height: 1 * Devices.displayScale },
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 4
    },

    search: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: padding,
        marginRight: padding,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        height: inputHeight,
        borderColor: 'black',
        borderWidth: 0.1 * Devices.displayScale,
        shadowOffset: { width: 0, height: 1 * Devices.displayScale },
        shadowOpacity: 0.2,
        shadowColor: 'black',
        elevation: 4
    },

    searchBar: {
        flex: 1,
        marginLeft: padding,
        marginRight: padding,
        fontSize: 14 * Devices.displayScale,
        padding: 0,
    },

    iconClearContainer: {
        width: iconClearContainerWidth,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconClear: {
        tintColor: Colors.grayBlur
    },

    icon: {
        width: iconSize,
        justifyContent:'center',
        alignItems:'center',
    },

    iconLast: {
        marginRight: padding,
    },

});
//#endregion

//#region PropTypes
ComponentSearchBar.propTypes = {
    style: PropTypes.any,
    inputStyle: PropTypes.any,
    shouldShowClearButton: PropTypes.bool,
    shouldEnableSortIcon: PropTypes.bool,
    shouldEnableFilterIcon: PropTypes.bool,
    shouldEnableAddIcon: PropTypes.bool,
    iconAdd: PropTypes.oneOf(['add_key', 'add_device', 'add_room', 'add_user']),
    isAscending: PropTypes.bool,
    isFiltered: PropTypes.bool,
    placeholderText: PropTypes.string,
    value: PropTypes.string,
    keyboardType: PropTypes.string,
    autoCorrect: PropTypes.bool,
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    onClear: PropTypes.func,
    onPressSortIcon: PropTypes.func,
    onPressFiltertIcon: PropTypes.func,
    onPressAddIcon: PropTypes.func,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func,
};
//#endregion

export default ComponentSearchBar;