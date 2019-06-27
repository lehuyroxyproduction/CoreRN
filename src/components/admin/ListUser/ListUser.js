import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
    Alert, 
    View,Image,
    ScrollView,
    FlatList,
    StatusBar,
    Button,
    TextInput,
    RefreshControl
} from 'react-native';
import {styles} from './styles'
import I18n from'react-native-i18n'
import {Devices} from '../../../constants/constants'
import {getApiListUserStart} from '../../../redux/actions/actionListUser'
import FastImage from 'react-native-fast-image';

class ListUser extends Component {

    //#region NavigationOptions
    static navigationOptions = {
        header : null
    }
    //#endregion

    constructor(props){
        super(props)
        this.state={
            value:'',
            listuser:[],
            refreshing:true
        }
    }

// #region life circle
componentDidMount(){
    this.props.getApiListUserStart()
}

componentWillReceiveProps(nextProps){
    console.log(nextProps.listuser.players)
   this.setState({
       listuser:nextProps.listuser.players,
       refreshing:false
    })
}
// #endregion life circle

    render(){
       const {value ,listuser,refreshing}=this.state
       console.log(listuser)
    return(
       <View style={{flex:1}} >
           <Image
                source={require('../../../assets/images/Monster_Energy_logo_logotype_emblem.png')}
                style={{
                    width:150,
                    height:50
                }}
            />
           <View>
               <TextInput
                value={value}
                placeholder='Please enter full name'
                onChange={()=>this.setName()}
               />
               <TouchableOpacity 
                    onPress={()=>console.log('sve')}
                    style={{width:Devices.width*0.25,height:50}}
                >
                    <Text>
                        Save
                    </Text>
                </TouchableOpacity>
                <ScrollView>
                    <FlatList
                        data={listuser}
                        extraData={this.props}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={this.renderList}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                    
                            />
                        }
                    />
                </ScrollView>
           </View>
          
       </View>
    );
}

// #region function

//list dish
renderList=({item,index})=>{
    console.log(item)
    return(
        <TouchableOpacity onLongPress={()=>console.log('delete')} style={styles.containerDish}>

            <View>
                <Text>{item.fullName}</Text>
                <Text>{item.age}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

}

//#region Redux

function mapStateToProps(state) {
    console.log(state)
    return {
        listuser:state.ListUser.response
    }
  }
  
  function dispatchToProps(dispatch) {
    return bindActionCreators({
        getApiListUserStart
    }, dispatch)
  }
  
  export default connect(mapStateToProps, dispatchToProps)(ListUser)
  //#endregion
