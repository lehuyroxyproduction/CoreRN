import React from 'react'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  AppState,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import timer from 'react-native-timer-mixin'

import { Container, SearchHeader } from 'components'
import { Text, Touchable, View } from 'components/uielements'
import Modal from 'react-native-modal'
import { Icons } from 'images'
import { firebase } from 'services'
import { Colors, Metrics } from 'themes'
import { fetch } from 'utils/api'
import { getAppVersion } from 'utils/version'

import { appConfig } from 'config'
import JobListItem from 'screens/Jobs/JobListItem'
import PlaceListItem from 'screens/ListItem/PlaceListItem'
import LoadingView from 'loading/LoadingView'
import { hp, wp, HEADER_HEIGHT } from 'constants'
import forEach from 'lodash/forEach'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import { Navigation } from 'react-native-navigation'
import {
  jobActions,
  jobSelectors,
  placeActions,
  placeSelectors,
  userSelectors,
  userActions,
  appSelectors,
  appActions
} from 'reducers'
import store from 'store/index'

class Jobs extends React.Component {
  value = {
    initPlaces: []
  }

  constructor(props) {
    super(props)
    // this.navigationEventListener = Navigation.events().bindComponent(this)
    // Subscribe
    this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(() =>
      props.getCategories(() => this.getJobs(true))
    )
    this.state = {
      isLoading: false,
      appState: AppState.currentState,
      selectedItems: [],
      pickerVisible: false
    }
    // popup dialog choose provinces first then load the data
    this.checkUserPlacesExist()
  }
  componentDidAppear() {
    this.startGetJobsAuto()
  }
  componentDidDisappear() {
    this.clearGetJobsAuto()
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.bottomTabEventListener) {
      this.bottomTabEventListener.remove()
    }
    if (this.navigationEventListener) {
      this.navigationEventListener.remove()
    }
  }

  startGetJobsAuto = () => {
    this.getJobsAuto = setInterval(() => {
      this.props.getCategories(() => this.getJobs(true))
    }, 20000)
  }

  clearGetJobsAuto = () => {
    clearInterval(this.getJobsAuto)
  }

  checkUserPlacesExist = () => {
    this.props.getUserFilterPlaces({
      onSuccess: () => {
        const { userFilterPlaces } = this.props
        if (userFilterPlaces.length) {
          this.initJobPage() // có lưu provinces thì tiếp tục chạy
        } else {
          this.getPlacesAndOpenPicker() // chưa có lưu provinces thì popup dialog chọn provinces
        }
      }
    })
  }

  checkUserPlacesExitWhenTabOpened = () => {
    const { userFilterPlaces } = this.props
    if (!userFilterPlaces.length) {
      this.getPlacesAndOpenPicker() // chưa có lưu provinces thì popup dialog chọn provinces
    }
  }

  initJobPage() {
    this.props.getCategories(() => this.getJobs(true))
    this.handleFirebase()
    // this.checkAppVersion()
    this.updateFcmToken()
    this.setBottomTabsHeight()
  }

  setBottomTabsHeight() {
    Navigation.constants().then(constants => this.props.updateBottomTabsHeight(constants.bottomTabsHeight))
  }

  updateFcmToken() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => this.props.updateFcmToken(fcmToken))

    firebase.messaging().onTokenRefresh(fcmToken => this.props.updateFcmToken(fcmToken))
  }

  register() {
    this.listener.register()
  }

  unregister() {
    if (this.listener) {
      this.listener.unregister()
      this.listener = null
    }
  }

  checkAppVersion() {
    if (appConfig.checkAppVersion) {
      fetch('getAppSetting').then(res => {
        if (res && res.data) {
          const data = res.data
          const version = getAppVersion()

          const currentVersion = version.code
          const requiredVersion = data[Platform.OS].version_code

          if (requiredVersion > currentVersion) {
            Alert.alert(
              'Cập nhật phiên bản mới',
              'Phiên bản mới hơn của ứng dụng đã được phát hành. Vui lòng cập nhật để tiếp tục sử dụng',
              [
                {
                  text: 'Cập nhật',
                  onPress: () => {
                    const url = data[Platform.OS].url

                    Linking.canOpenURL(url).then(supported => {
                      if (!supported) {
                        // console.log('Can\'t handle url: ' + url)
                      } else {
                        return Linking.openURL(url)
                      }
                    })
                  }
                }
              ],
              { cancelable: false }
            )
          }
        }
      })
    }
  }

  getJobs = isRefeshing => {
    this.props.getJobs(isRefeshing)
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (nextProps.isLoading) {
      this.setState({ isLoading: true })
    } else {
      timer.setTimeout(() => this.setState({ isLoading: false }), 500)
    }
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.isLoading) {
  //     this.setState({isLoading: true})
  //   } else {
  //     timer.setTimeout(() => this.setState({isLoading: false}), 500)
  //   }
  //   AppState.addEventListener('change', this._handleAppStateChange)
  // }

  _handleAppStateChange = nextAppState => {
    // console.log(nextAppState)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'enable') {
      // console.log('App has come to the foreground!')
      // this.checkAppVersion() // hiding temporarily
      this.checkUserPlacesExist()
      // this.checkUserPlacesExitWhenTabOpened()
    }
    this.setState({ appState: nextAppState })
  }

  async handleFirebase() {
    const message = firebase.messaging()
    const hasPermission = await message.hasPermission()

    if (!hasPermission) {
      await message.requestPermission()
    }

    // use when app in background
    firebase.notifications().onNotificationOpened(notificationOpen => {
      if (notificationOpen.notification.data) {
        const type = notificationOpen.notification.data.type

        switch (type) {
          case 'job':
            this.props.navigator.switchToTab({ tabIndex: 3 })

            this.props.push({
              screen: 'JobDetails',
              passProps: {
                jobId: notificationOpen.notification.data.job_id
              }
            })
            break
          case 'link':
            const url = notificationOpen.notification.data.url

            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + url)
              } else {
                return Linking.openURL(url)
              }
            })
            break
        }
      }
    })

    // use when app in foreground
    firebase.notifications().onNotification(message => {
      if (message.data) {
        const type = message.data.type

        switch (type) {
          case 'job':
            this.props.navigator.setTabBadge({
              tabIndex: 3,
              badge: 1
            })
            break
          case 'link':
            this.props.navigator.setTabBadge({
              tabIndex: 3,
              badge: 1
            })
            break
          case 'popup':
            Alert.alert('Thông báo', message.data.content, [
              {
                text: 'OK',
                onPress: () => {}
              }
            ])
            break
          default:
            break
        }
      }
    })
  }

  onEndReached = () => {
    if (!this.canAction) {
      return
    }
    return this.getJobs()
  }

  getPlacesAndOpenPicker = () => {
    this.props.getUserFilterPlaces({
      onSuccess: () => {
        const { userFilterPlaces } = this.props
        if (userFilterPlaces.length) {
          // console.log('this.value.initPlaces', this.value.initPlaces)
          // console.log('userFilterPlace', userFilterPlaces)
          this.value.initPlaces = []
          forEach(userFilterPlaces, item => this.value.initPlaces.push(item.province_id))
          this.setState({
            selectedItems: this.value.initPlaces
          })
        }
      }
    })
    this.props.getPlaces({
      onSuccess: () => {
        this.setState({
          pickerVisible: true
        })
      }
    })
  }

  toggleJobFilterDrawer = () => {
    this.props.getPlaces({
      onSuccess: () => this.props.showDrawer()
    })
  }

  renderListHeader = () => {
    return <SearchHeader onFilterButtonClick={this.toggleJobFilterDrawer} />
  }

  renderListFooter = () => {
    const { total, jobs, status, isLoading } = this.props

    if (jobs.length) {
      if (isLoading) {
        return <ActivityIndicator style={{ paddingVertical: 24 }} size="small" color={Colors.coral} />
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
    return <View fillHorizontal style={{ paddingVertical: total === jobs.length ? 8 : 32 }} />
  }

  renderListError() {
    const { jobs, status } = this.props

    if (!jobs.length && status === 'error') {
      return (
        <View absolute center fill style={{ marginTop: HEADER_HEIGHT }}>
          <Text small center>
            Có lỗi xảy ra. {'\n'}Vui lòng kéo xuống để thử lại
          </Text>
        </View>
      )
    } else if (!jobs.length) {
      return (
        <View absolute center fill style={{ marginTop: HEADER_HEIGHT }}>
          <Text small center>
            Không tìm thấy công việc ở khu vực này
          </Text>
        </View>
      )
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  provincesPickerModal = () => {
    return (
      <Modal
        style={{ alignItems: 'center', justifyContent: 'center' }}
        isVisible={this.state.pickerVisible}
        hardwareAccelerated>
        <View
          background="transparent"
          center
          style={{
            width: wp(82),
            height: hp(69)
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 1,
              width: wp(9),
              height: wp(9),
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => this.setState({ pickerVisible: false })}>
            <Image source={Icons.close2} />
          </TouchableOpacity>
          <View
            background={Colors.white}
            style={{
              width: wp(75),
              height: hp(65),
              borderRadius: 8
            }}>
            <View flex>
              <View
                style={{
                  height: hp(10),
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: hp(4)
                }}>
                <Text bold large color={Colors.slate}>
                  {'TÌM KHU VỰC'.toUpperCase()}
                </Text>
              </View>
              <View flex>{this.renderPlacesList()}</View>
            </View>
            <Touchable
              style={{ height: hp(6) }}
              gradient
              gradientStyle={styles.buttonGradient}
              onPress={this.confirmFilterPlaces}>
              <Text bold color="white">
                {'xác nhận'.toUpperCase()}
              </Text>
            </Touchable>
          </View>
        </View>
      </Modal>
    )
  }

  confirmFilterPlaces = () => {
    this.setState({ isLoading: true })
    let tmp = this.state.selectedItems
    this.setState({ pickerVisible: false, selectedItems: [] }, () => {
      let tmpSubscribe = differenceWith(tmp, this.value.initPlaces, isEqual)
      let tmpUnsubscribe = differenceWith(this.value.initPlaces, tmp, isEqual)
      if (tmpSubscribe.length && tmpUnsubscribe.length) {
        this.props.subscribeUnsubcribePlaces({ subProvinces: tmpSubscribe, unsubProvinces: tmpUnsubscribe })
      } else if (!tmpSubscribe.length && !tmpUnsubscribe.length) {
      } else {
        tmpSubscribe.length && this.props.subscribePlaces(tmpSubscribe)
        tmpUnsubscribe.length && this.props.unSubscribePlaces(tmpUnsubscribe)
      }
      this.value.initPlaces = []
    })
  }

  renderPlacesList = () => {
    const { places } = this.props
    const { selectedItems } = this.state
    return (
      <PlaceListItem
        items={places}
        uniqueKey="province_id"
        displayKey="province_name"
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedItems}
      />
    )
  }

  onRefresh = () => {
    // if (!this.value.canAction) return
    return this.getJobs(true)
  }

  gotoJobDetailPage = jobId => {
    if (this.props.isConnected) {
      let onSuccess = () => this.props.push({ screen: 'JobDetails', passProps: { jobId } })
      this.props.getJobDetails({
        jobId,
        onSuccess
      })
    }
  }

  renderItem = ({ item }) => {
    return <JobListItem item={item} onItemClick={this.gotoJobDetailPage} />
  }

  render() {
    const { jobs, isLoadingGetPlaces, isLoadingGetUserFilterPlaces, isLoadingGetJobDetails } = this.props
    const { isLoading } = this.state
    return (
      <Container background={Colors.white} statusbarColor="light-content" isNavbarHidden>
        {this.provincesPickerModal()}
        {this.renderListHeader()}
        {this.renderListError()}
        <FlatList
          data={jobs}
          style={{ marginTop: 90, flexGrow: 0 }}
          extraData={jobs}
          // contentContainerStyle={{ alignSelf: 'center' }}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          onEndReachedThreshold={0.2}
          // onMomentumScrollBegin={() => {
          //     this.onEndReachedCalledDuringMomentum = false
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
        {(isLoadingGetPlaces || isLoadingGetUserFilterPlaces || isLoadingGetJobDetails) && <LoadingView />}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  buttonGradient: {
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  }
})
const mapStateToProps = state => ({
  userFilterPlaces: placeSelectors.getUserFilterPlaces(state),
  places: placeSelectors.getPlaces(state),
  jobs: jobSelectors.getJobs(state),
  total: jobSelectors.getTotal(state),
  isConnected: appSelectors.getNetInfo(state),
  status: jobSelectors.getStatus(state, 'getJobs'),
  isLoading: jobSelectors.getLoading(state, 'getJobs'),
  isLoadingGetPlaces: placeSelectors.getLoading(state, 'getPlaces'),
  isLoadingGetUserFilterPlaces: placeSelectors.getLoading(state, 'getUserFilterPlaces'),
  isLoadingGetJobDetails: jobSelectors.getLoading(state, 'getJobDetails')
})

const mapDispatchToProps = {
  getJobs: jobActions.getJobs,
  updateFcmToken: userActions.updateFcmToken,
  getPlaces: placeActions.getPlaces,
  getUserFilterPlaces: placeActions.getUserFilterPlaces,
  subscribePlaces: placeActions.subscribePlaces,
  unSubscribePlaces: placeActions.unSubscribePlaces,
  subscribeUnsubcribePlaces: placeActions.subscribeUnSubscribePlaces,
  getJobDetails: jobActions.getJobDetails,
  getJobDetailsToCheck: jobActions.getJobDetailsToCheck,
  getCategories: jobActions.getCategories,
  updateBottomTabsHeight: appActions.updateBottomTabsHeight
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs)
