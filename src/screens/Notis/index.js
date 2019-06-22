import React from 'react'
import {ActivityIndicator, FlatList, Image, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import {Container, SearchHeader} from 'components'
import {actions, selectors} from 'reducers/notis'
import {Text, Touchable, View} from 'components/uielements'
import {Colors, Metrics} from 'themes'
import {fetch} from 'utils/api'
import {Icons, Images} from 'images'
import {HEADER_HEIGHT, hp, wp} from 'constants'
import {selectors as appSelectors} from 'reducers/app'

import {actions as userActions, selectors as userSelectors} from 'reducers/user'
import {actions as jobActions} from 'reducers/jobs'
import NotisListItem from 'screens/ListItem/NotisListItem'
import MyWebView from 'screens/MyWebView'
import timer from 'react-native-timer-mixin'
import { Navigation } from 'react-native-navigation'

class Notis extends React.PureComponent {
  constructor(props) {
    super(props)
    this.navigationEventListener = Navigation.events().bindComponent(this)
    this.state = {
      isLoading: false
      // url: null
    }
    this.getNotificationAccountId()
  }

  componentDidAppear() {
    this.getUserNotis(true)
  }

  componentWillUnmount() {
    // Not mandatory
    //   if (this.bottomTabEventListener) { this.bottomTabEventListener.remove() }
    if (this.navigationEventListener) {
      this.navigationEventListener.remove()
    }
  }

    getNotificationAccountId = () => {
      this.props.getNotificationAccountId({
        meta: {
          onSuccess: () => this.getUserNotis()
        }
      })
    }

    getUserNotis = (isRefreshing = false) => {
      this.props.getUserNotis({
        isRefreshing,
        account_id: this.props.notificationAccountId
      })
      // this.props.getUserNotis({ isRefreshing, account_id: 1 })
    }

    checkReadNotification = (notificationId) => {
      this.props.readUserNotification({
        account_id: this.props.notificationAccountId,
        notificationId,
        onSuccess: () => this.getUserNotis()
      })
    }

    goToDetailPage = ({id, data}) => {
      if (!data) {
        return
      }
      data = JSON.parse(data)
      const type = data.type
      this.checkReadNotification(id)
      switch (type) {
        case 'job':
          return this.gotoJobDetailPage(data.job_id)
        case 'link':
          const url = data.url
          return this.setState({url})
        default:
          return
      }
    }

    gotoJobDetailPage = jobId => {
      // this.setState({isLoading: true})

      if (this.props.isConnected) {
        const onSuccess = () => {
          this.props.push({screen:'JobDetails', passProps:{jobId}})
          // this.setState({isLoading: false})
        }
        this.props.getJobDetailsToCheck({
          jobId, onSuccess
        })
      }
    }

    openLink = url => <MyWebView url={url} onBackPress={() => this.setState({url: null})} />

    renderItem = ({item}) => {
      return <NotisListItem item={item} onItemClick={this.goToDetailPage} />
    }

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
      if (nextProps.isLoading) {
        this.setState({isLoading: true})
      } else {
        timer.setTimeout(() => this.setState({isLoading: false}), 500)
      }
    }

    onEndReached = () => {
      if (!this.canAction) {
        return
      }
      return this.getUserNotis()
    }

    renderListEmpty = () => {
      return (
        <View absolute center
          style={{
            top: HEADER_HEIGHT,
            bottom: 0,
            left: 0,
            right: 0
          }}>
          <Image resizeMode="contain"
            source={Images.mailbox}
            style={{width: wp(30)}}
          />
          <Text bold color={Colors.slate} style={{marginTop: hp(8.54)}}>
                    Chưa có thông báo mới!
          </Text>
          <Text color={Colors.steel} style={{marginTop: hp(1.94)}}>
                    Bạn có thể xem tất cả thông báo mới tại đây.
          </Text>
        </View>
      )
    }

    renderListHeader = () => <SearchHeader title="THÔNG BÁO" />

    renderListError = () => {
      const {notis, status} = this.props
      if (!notis.length && status === 'error') {
        return (
          <View absolute center fill>
            <Text small center>
                        Có lỗi xảy ra. {'\n'}
                        Vui lòng kéo xuống để thử lại
            </Text>
          </View>
        )
      } else if (!notis.length) {
        return this.renderListEmpty()
      }
    }

    renderListFooter = () => {
      const {total, notis, isLoading} = this.props

      if (notis.length) {
        if (isLoading) {
          return (
            <ActivityIndicator
              style={{paddingVertical: 24}}
              size="small"
              color={Colors.coral}
            />
          )
        }

        //   if (status === 'error') {
        //     return (
        //       <Touchable
        //         style={{
        //           width: '100%',
        //           height: 64
        //         }}
        //       >
        //         <Text small color="blue">
        //           Thử lại
        //         </Text>
        //       </Touchable>
        //     )
        //   }
      }

      return (
        <View
          fillHorizontal
          style={{paddingVertical: total === notis.length ? 8 : 32}}
        />
      )
    }

    onRefresh = () => {
      // if (!this.value.canAction) return
      this.getUserNotis(true)
    }

    render() {
      const {notis, isLoading: userNotisLoading} = this.props
      const {url, isLoading} = this.state
      return (
        <Container
          statusbarColor="light-content"
          isNavbarHidden>
          {this.renderListHeader()}
          {this.renderListError()}
          <FlatList
            data={notis}
            style={{marginTop: 90, flexGrow: 0}}
            extraData={notis}
            // contentContainerStyle={{ alignSelf: 'center' }}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
            onEndReachedThreshold={0.2}
            // onMomentumScrollBegin={() => {
            //   this.onEndReachedCalledDuringMomentum = false
            // }}
            onScrollBeginDrag={() => {
              this.canAction = true
            }}
            onScrollEndDrag={() => {
              this.canAction = false
            }}
            onMomentumScrollBegin={() => {
              this.canAction = true
            }}
            onMomentumScrollEnd={() => {
              this.canAction = false
            }}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.renderListFooter}
            refreshControl={
              <RefreshControl
                colors={['#rgba(251,190,38,1)', Colors.dustyOrange]}
                tintColor={Colors.coral}
                refreshing={isLoading}
                onRefresh={this.onRefresh}
              />
            }
          />
          {url && this.openLink(url)}
        </Container>
      )
    }
}

const mapStateToProps = state => ({
  notis: selectors.getUserNotis(state),
  total: selectors.getUserNotisTotal(state),
  isConnected: appSelectors.getNetInfo(state),
  status: selectors.getStatus(state, 'getUserNotis'),
  isLoading: selectors.getLoading(state, 'getUserNotis'),
  notificationAccountId: userSelectors.getNotificationAccountId(state)
})

const mapDispatchToProps = dispatch => ({
  getUserNotis: params => dispatch(actions.getUserNotis(params)),
  getNotificationAccountId: params => {
    dispatch(userActions.getNotificationAccountId(params))
  },
  readUserNotification: param => dispatch(actions.readUserNotification(param)),
  getJobDetails: params => dispatch(jobActions.getJobDetails(params)),
  getJobDetailsToCheck: params => dispatch(jobActions.getJobDetailsToCheck(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notis)
