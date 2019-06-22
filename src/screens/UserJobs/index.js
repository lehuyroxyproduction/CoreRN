import React from 'react'
import {connect} from 'react-redux'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'

import timer from 'react-native-timer-mixin'

import {Container, SearchHeader} from 'components'
import {View, Text, Touchable} from 'components/uielements'

import {Colors, Metrics} from 'themes'

import {Icons} from 'images'

import {actions, selectors} from 'reducers/jobs'
import {selectors as appSelectors} from 'reducers/app'

import convert from 'utils/converter'

import {hp, wp, WORK} from 'constants'
import LoadingView from 'loading/LoadingView'
import { Navigation } from 'react-native-navigation'

const supplierIconSize = wp(13.1)

class UserJobs extends React.Component {
    state = {isLoading: false}

    constructor(props) {
      super(props)
      this.navigationEventListener = Navigation.events().bindComponent(this)
      // Subscribe
      // this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(()=>this.getUserJobs(true))
    }

    componentDidAppear() {
      this.getUserJobs(true)
    }
    componentWillUnmount() {
    // Not mandatory
    //   if (this.bottomTabEventListener) { this.bottomTabEventListener.remove() }
      if (this.navigationEventListener) {
        this.navigationEventListener.remove()
      }
    }

    componentDidMount() {
      this.getUserJobs()
    }

    getUserJobs(isRefreshing) {
      this.props.getUserJobs(isRefreshing)
    }

    componentWillReceiveProps(nextProps) {
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
      return this.getUserJobs()
    }

    renderListHeader = () => {
      return <SearchHeader />
    }

    renderListFooter() {
      const {total, jobs, status, isLoading} = this.props

      if (jobs.length) {
        if (isLoading) {
          return (
            <ActivityIndicator
              style={{paddingVertical: 24}}
              size="small"
              color={Colors.coral}
            />
          )
        }

        if (status === 'error') {
          return (
            <Touchable
              style={{
                width: '100%',
                height: 64
              }}>
              <Text small color="blue">
                            Thử lại
              </Text>
            </Touchable>
          )
        }
      }

      return (
        <View
          fillHorizontal
          style={{paddingVertical: total === jobs.length ? 8 : 32}}
        />
      )
    }

    renderListError() {
      const {jobs, status} = this.props

      if (jobs.length === 0) {
        const emptyMessage = 'Bạn chưa ứng tuyển công việc nào'
        const errorMessage = `Có lỗi xảy ra.
         Vui lòng kéo xuống để thử lại`

        return (
          <View style={{marginTop: 20}} absolute center fill>
            <Text small center>
              {status === 'success'
                ? emptyMessage
                : status === 'error'
                  ? errorMessage
                  : ''}
            </Text>
          </View>
        )
      }

      return null
    }

    renderItem = ({item, index}) => {
      const {
        id,
        name,
        workId,
        time,
        date,
        supplier,
        place,
        salary,
        status
      } = item

      if (
        status === WORK.CANCELED ||
            status === WORK.REJECTED
      ) {
        return null
      }

      return (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => {
            if (this.props.isConnected) {
              this.props.getUserJobDetails({
                workId, meta: {
                  onSuccess: this.props.push({screen: 'UserJobDetails', passProps:{workId}})
                }
              })
            }
          }}>
          {supplier.avatar ? (
            <Image style={styles.itemIcon} source={{uri: supplier.avatar}} />
          ) : (
            <View
              style={[
                styles.itemIcon,
                {
                  borderWidth: 1,
                  borderColor: '#EAEAEA'
                }
              ]}
            />
          )}

          <View
            flex
            style={{justifyContent: 'space-between'}}>
            <Text
              bold
              small
              color={Colors.slate}
              numberOfLines={2}>
              {name}
            </Text>
            <View center row style={{justifyContent: 'space-between', marginVertical: hp(1)}}>
              <View center row>
                <Image style={{marginRight: wp(1)}} source={Icons.dollar} />
                <Text bold small color={Colors.dustyOrange}>{convert.toCurrency(salary)} đ</Text>
              </View>
              <Text small>
                {status === WORK.PENDING ? (
                  <Text small color={Colors.robinSEgg}>
                                    Đang chờ
                  </Text>
                ) : status === WORK.APPROVED ? (
                  <Text small color={Colors.freshGreen}>
                                    Đã duyệt
                  </Text>
                ) : status === WORK.FINISHED ? (
                  <Text small color={Colors.turquoiseBlue}>
                                    Hoàn thành
                  </Text>
                ) : (
                  'Từ chối'
                )}
              </Text>
            </View>
            <View row center style={{justifyContent: 'space-between'}}>
              <View row>
                <Image style={{marginEnd: wp(1)}} source={Icons.address} />

                <Text tiny numberOfLines={1}>
                  {place}
                </Text>
              </View>
              <View row center>
                <Image style={{marginEnd: wp(2)}} source={Icons.calendar} />

                <Text tiny>
                  {date.start}
                </Text>
              </View>

            </View>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
      const {jobs, getJobDetailLoading} = this.props
      const {isLoading} = this.state

      return (
        <Container background={Colors.white} isNavbarHidden>
          {this.renderListHeader()}

          {this.renderListError()}

          <FlatList
            data={jobs}
            extraData={jobs}
            style={{marginTop: 90}}
            // contentContainerStyle={{alignSelf: 'center'}}
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
            onEndReachedThreshold={0.2}
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
            ListFooterComponent={this.renderListFooter()}
            refreshControl={
              <RefreshControl
                colors={['#rgba(251,190,38,1)', Colors.dustyOrange]}
                tintColor={Colors.coral}
                refreshing={isLoading}
                onRefresh={() => this.getUserJobs(true)}
              />
            }
          />
          {getJobDetailLoading && <LoadingView />}
        </Container>
      )
    }
}

const styles = StyleSheet.create({
  itemIcon: {
    width: supplierIconSize,
    height: supplierIconSize,
    borderRadius: supplierIconSize / 2,
    marginHorizontal: wp(2),
    alignSelf: 'center'
  },
  listItem: {
    width: '96%',
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingVertical: hp(.5),
    marginVertical: hp(.5),
    marginHorizontal: wp(2),
    paddingEnd: wp(3),
    flexDirection: 'row',
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => ({
  jobs: selectors.getUserJobs(state),
  total: selectors.getUserJobsTotal(state),
  isConnected: appSelectors.getNetInfo(state),
  status: selectors.getStatus(state, 'getUserJobs'),
  isLoading: selectors.getLoading(state, 'getUserJobs'),
  getJobDetailStatus: selectors.getStatus(state, 'getUserJobDetails'),
  getJobDetailLoading: selectors.getLoading(state, 'getUserJobDetails')
})

const mapDispatchToProps = dispatch => ({
  getUserJobDetails: params => dispatch(actions.getUserJobDetails(params)),
  getUserJobs: isRefreshing => dispatch(actions.getUserJobs(isRefreshing))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserJobs)
