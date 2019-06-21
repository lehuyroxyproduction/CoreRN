import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import I18n from "react-native-i18n";
import { DisplayScale } from '../../constants/constants';
import { AppText } from '.'


const ROW_PADDING = 20 * DisplayScale;

class ModalMenu extends Component {
    state = { visible: false }

    show() { this.setState({visible: true})}
    hide() { this.setState({visible: false})}

    render() {
        const { children, title } = this.props;

        return (
            <Modal
                { ...this.props }
                backdropColor={'green'}
                backdropOpacity= {1}
                animationType='fade'
                transparent={true}
                visible={this.state.visible} 
                onRequestClose={() => null} //Disable Warning
            >
                <TouchableWithoutFeedback style={MenuStyles.container_background} onPress={()=>this.hide()}>
                    <View
                        style={MenuStyles.background} 
                        onPress={()=>this.hide()}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={MenuStyles.container} >
                    <AppText style={[MenuStyles.title]}>
                        {title}
                    </AppText>
                    <ScrollView style={MenuStyles.container_item}>
                        <View style={{paddingVertical: ROW_PADDING / 2}}>
                            {children}
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>this.hide()}>
                        <AppText style={[MenuStyles.cancel]}>
                            {I18n.t('Cancel')}
                        </AppText>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const MenuStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    container_background: {
        
    },
    container: {
        maxHeight: '50%',
        backgroundColor: '#fff',
    },
    container_item: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        color: 'rgb(166,166,166)',
        paddingVertical: ROW_PADDING / 1.5,
        paddingHorizontal: ROW_PADDING,
    },
    cancel: {
        color: '#000',
        paddingVertical: ROW_PADDING / 1.5,
        paddingHorizontal: ROW_PADDING,
    },
    child_row: {
        flex: 1,
        paddingVertical: ROW_PADDING / 2,
        paddingHorizontal: ROW_PADDING,
    }
});

export {ModalMenu, MenuStyles};