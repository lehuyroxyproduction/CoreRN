import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { TouchableOpacity,
    Text,
    Image,
    ScrollView,
    FlatList,
    StatusBar,
    // Button,
    TextInput,
    RefreshControl
} from 'react-native'
import Slider from 'react-native-slider'
import {styles} from './styles'
import I18n from'react-native-i18n'
import {Devices, wp, screenHeight, screenWidth,Colors, isAndroid} from '../../../constants/constants'
import {getApiListUserStart} from '../../../redux/actions/actionListUser'
import {View, Container, Loader,Button} from '../../../containers'

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
            refreshing:true,
            isVisible:false,
            ind:''
        }
    }

// #region life circle
componentDidMount(){
  this.props.getApiListUserStart()
}

componentWillReceiveProps(nextProps){
    // console.log(nextProps.listuser.players)
    if(nextProps.listuser){
    this.setState({
      listuser:nextProps.listuser.players,
      refreshing:false
    })
    }else{
      console.log("null")
    }
}
// #endregion life circle

    render(){
      const {value ,listuser,refreshing}=this.state
      console.log(screenHeight)
    return(
      <Container statusBarBackgroundColor={Colors.cyanWhite} >
            <View
            justifyCenter
            centerItems
            >
              <Image
                source={require('../../../assets/images/Monster_Energy_logo_logotype_emblem.png')}
                style={{
                  width:170,
                  height:50,
                  margin:5
                }}
                />
            </View>
            <View>
                <View row justifySpaceBetween style={{height:50 , backgroundColor: '#ff5511'}}>  
                  <TextInput
                    value={value}
                    placeholder='Please enter full name'
                    onChangeText={e=>this.setName(e)}
                    style={{
                      height:50,
                      width:wp(75)
                    }}
                  />
                  <View 
                    justifySpaceBetween 
                    centerItems
                    alignCenter
                    style={{
                      width:wp(25)
                    }}
                    >
                      <Button 
                        title='Save'
                      />
                  </View>
                </View>
                <View>
                  <Text>Age</Text>
                  <Slider/>
                </View>
                <ScrollView>
                    <FlatList
                        data={listuser}
                        extraData={this.props}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={this.renderList}
                        refreshControl={
                          <RefreshControl
                                refreshing={refreshing}
                                onRefresh={()=>this.onRefresh()}
                                />
                              }
                              />
                </ScrollView>
            </View>
      </Container>
    );
} 

// #region function

onRefresh = async () =>{
  this.setState({refreshing:!this.state.refreshing})
  this.props.getApiListUserStart()
}

//show button delete
showButtonDel = i => {
  this.setState({
    isVisible : true ,
    ind : i
    })
}
//Hidden button delete
hiddenButtonDel = i => {
  console.log("hiden")
  const { ind , isVisible } = this.state
  console.log(ind)
  console.log(i)
  console.log(isVisible)
    ind !== i && isVisible ?
    this.setState({
        isVisible : false ,
        ind : ''
    })
    : null
}
setName = e =>{
    this.setState({
        value:e
    })
}
//list Users
renderList=({item,index})=>{
    console.log(item)
    const { isVisible , ind } = this.state
    return(
        <TouchableOpacity 
            onLongPress={()=>this.showButtonDel(index)} 
            onPress={()=>this.hiddenButtonDel(index)} 
            style={styles.itemList}
            >
          <View row justifySpaceBetween style={{height:40}}>
            <View>
                <Text>{item.fullName}</Text>
                <Text>{item.age}</Text>
            </View>
            <View style={{
                    paddingHorizontal:8,
                    paddingVertical:5,
                    }}>
                {
                    isVisible && ind === index ?
                        <Button title='Delete' onPress={()=>console.log("delete")}/> :
                        null

                }
            </View>
          </View>
        </TouchableOpacity>
    )
}

}

//#region Redux

function mapStateToProps(state) {
    console.log(state)
    return {
        listuser:state.reducerListUser.response
    }
  }
  
  function dispatchToProps(dispatch) {
    return bindActionCreators({
        getApiListUserStart
    }, dispatch)
  }
  
  export default connect(mapStateToProps, dispatchToProps)(ListUser)
  //#endregion
