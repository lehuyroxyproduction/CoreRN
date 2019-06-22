import React from 'react'

import { Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Container, Button } from 'components'
import { View, Text, Touchable } from 'components/uielements'

import { Colors, Styles } from 'themes'
import { Icons } from 'images'

import convert from 'utils/converter'

import { actions, selectors } from 'reducers/jobs'
import { selectors as userSelectors } from 'reducers/user'
import _findIndex from 'lodash/findIndex'
import * as Constants from 'constants'
import moment from 'moment'
import { Navigation } from 'react-native-navigation'
import { jobActions } from 'reducers/index'
import { PAYMENT_METHODS } from '../../constants'

moment.locale('vi')

class JobDetails extends React.Component {
  state = {
    note: '',
    selectedIndex: [], // item's position same as workshiftDate
    workshiftsDate: [], //
    selectedDateIndex: 0, // current position
    selectedWorkshifts: {}, // all selected workshifts
    workShifts: []
  }

  componentDidMount() {
    this.props.getJobDetails({ jobId: this.props.jobId })
  }

  componentWillUnmount() {
    // timer reload page
    clearTimeout(this.timer)
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (nextProps.applyWorksStatus === 'error') {
      let res = nextProps.applyWorksMessage
      let description = ''
      if (!res.data) {
        description = res.message
      } else {
        const { workShifts } = this.state
        res.data.map((item, i) => {
          const { workshift_id, time_in, time_out } = item.data
          if (item.status_code === 1000) {
            console.log(item.data.workshift_id)
            description += `Ca ${_findIndex(workShifts, { id: workshift_id }) + 1}: ${moment
              .unix(time_in)
              .format('HH:mm')} - ${moment.unix(time_out).format('HH:mm')} Đăng ký thành công\n`
          } else {
            console.log(item.data.workshift_id)
            description += `Ca ${_findIndex(workShifts, { id: workshift_id }) + 1}: ${moment
              .unix(time_in)
              .format('HH:mm')} - ${moment.unix(time_out).format('HH:mm')} ${item.message}\n`
          }
        })
      }

      this.showAlert({
        type: 'error',
        title: 'Thất bại',
        description,
        onPress: () => this.props.cancelApplyWorks(),
        onDismiss: () => this.props.cancelApplyWorks()
      })
    }

    if (this.props.jobDetails !== nextProps.jobDetails) {
      let selectedIndex = []
      const workshiftsDate = nextProps.jobDetails.workshifts.map(({ date }) => {
        selectedIndex.push(0)
        return date
      })
      const workShifts = nextProps.jobDetails.workshifts[selectedIndex].workshifts
        ? nextProps.jobDetails.workshifts[selectedIndex].workshifts
        : []

      this.setState({
        workshiftsDate,
        selectedIndex,
        workShifts
      })

      if (nextProps.applyWorksStatus === 'success') {
        const { applyWorksIssues } = this.props

        const description = applyWorksIssues.length
          ? applyWorksIssues.map(({ message, date, time }, index) => {
            if (index > 0 && message === applyWorksIssues[index - 1].message) {
              message = ''
            }

            let lineBreak = ''

            if (message) {
              lineBreak = '\n'
            }

            return lineBreak + message + ' ' + '\n' + date + ': ' + time.in + ' - ' + time.out
          })
          : 'Bạn đã ứng tuyển thành công.\nVui lòng chờ nhà tuyển dụng duyệt nhé'

        this.showAlert({
          type: applyWorksIssues.length ? 'error' : 'success',
          title: applyWorksIssues.length ? 'Thất bại' : 'Thành công!',
          description,
          onPress: () => this.props.cancelApplyWorks(),
          onDismiss: () => this.props.cancelApplyWorks()
        })
      }
    }
  }

  showAlert = ({ title, type, description, hasInput, ...others }) => {
    this.props.showModal({
      screen: 'Alert',
      passProps: {
        title,
        type,
        description,
        hasInput,
        ...others
      },
      options: {
        ...Styles.modalStyle
      }
    })
  }

  onApply = (isAvailable, isPending, isApproved) => {
    const { userInfo } = this.props
    console.log('userInfo', userInfo)

    if (userInfo.status === Constants.USER_STATUS.ACTIVE) {
      if (isAvailable) {
        const { selectedWorkshifts } = this.state
        const { jobId, applyWorks } = this.props
        if (Object.keys(selectedWorkshifts).length) {
          const { workshiftsDate } = this.state
          const { workshifts } = this.props.jobDetails

          const description = ''
            .concat(
              Object.keys(selectedWorkshifts)
                .sort()
                .reverse()
                .map((i, index, arr) => {
                  let str = '\n Ngày ' + i.split('&')[1]

                  if (index > 0 && i.split('&')[1] === arr[index - 1].split('&')[1]) {
                    str = ''
                  }

                  return (
                    str +
                    '\n Ca ' +
                    `${Number(i.split('&&')[1]) + 1}` +
                    ': ' +
                    workshifts[workshiftsDate.indexOf(i.split('&')[1])].workshifts[i.split('&&')[1]].time.in +
                    ' - ' +
                    workshifts[workshiftsDate.indexOf(i.split('&')[1])].workshifts[i.split('&&')[1]].time.out
                  )
                })
            )
            .replace(',', '')

          this.showAlert({
            title: 'Đăng ký ứng tuyển',
            description,
            hasInput: true,
            inputPlaceholder: 'Nhập ghi chú của bạn',
            onChangeText: note => this.setState({ note }),
            onPress: () => {
              applyWorks({
                note: this.state.note,
                jobId,
                selectedWorkshifts: Object.values(selectedWorkshifts)
              })
              this.setState({ selectedWorkshifts: {} })
            }
          })
        } else {
          this.showAlert({
            title: 'Thất bại',
            type: 'error',
            description: 'Vui lòng chọn một ca làm để ứng tuyển!'
          })
        }
      } else if (isPending) {
        this.showAlert({
          title: 'Thất bại',
          type: 'error',
          description: `Bạn đã ứng tuyển công việc này.
            Vui lòng chờ duyệt!`
        })
      } else if (isApproved) {
        this.showAlert({
          title: 'Thất bại',
          type: 'error',
          description: 'Bạn đã ứng tuyển công việc này thành công!'
        })
      }
    } else if (userInfo.status === Constants.USER_STATUS.BLOCKED) {
      this.showAlert({
        title: 'Thất bại',
        type: 'error',
        description: 'Tài khoản của bạn đã bị khóa',
        onPress: () => {
          this.props.dismissModal()
          setTimeout(() => this.props.push({ screen: 'Profile' }), 250)
        }
      })
    } else {
      this.showAlert({
        title: 'Thất bại',
        type: 'error',
        description: `Vui lòng cập nhật thông tin cá nhân
          để ứng tuyển`,
        onPress: () => {
          this.props.push({
            screen: 'Profile',
            passProps: {
              isFirstUpdate: true
            }
          })
          // this.props.dismissModal()
          // setTimeout(
          //   () =>
          //     this.props.push({
          //       screen: 'Profile',
          //       passProps: {
          //         isFirstUpdate: true
          //       }
          //     }),
          //   250
          // )
        }
      })
    }
  }

  onWorkshiftPress = index => {
    const { selectedIndex, selectedDateIndex } = this.state

    selectedIndex[selectedDateIndex] = index

    this.setState({
      selectedIndex
    })
  }

  onWorkshiftSelect = (id, date, index) => {
    let selectedWorkshifts = this.state.selectedWorkshifts

    if (selectedWorkshifts.hasOwnProperty(id + '&' + date + '&&' + index)) {
      delete selectedWorkshifts[id + '&' + date + '&&' + index]
    } else {
      selectedWorkshifts = {
        ...selectedWorkshifts,
        [id + '&' + date + '&&' + index]: id
      }
    }

    const { selectedIndex, selectedDateIndex } = this.state

    selectedIndex[selectedDateIndex] = index

    this.setState({ selectedWorkshifts, selectedIndex })
  }

  onPhonePress = phoneNumber => {
    const url = `tel:${phoneNumber}`

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    })
  }

  renderWorkshift = (workshift, index) => {
    const { selectedIndex, selectedDateIndex, selectedWorkshifts, workshiftsDate } = this.state
    const { id, time, date, salary, freelancerStatus, workerCount } = workshift

    const isAvailable = freelancerStatus === Constants.WORKSHIFT.AVAILABLE

    const isSelectedIndex = index === selectedIndex[selectedDateIndex]

    const isSelected = selectedWorkshifts.hasOwnProperty(id + '&' + date + '&&' + index)
    const isMaxWorkerCount = workerCount.current === workerCount.total

    // styles
    const borderWidth = isSelected ? 0.5 : 1

    const textColor = isSelectedIndex && !isMaxWorkerCount ? Colors.coral : borderColor

    const amountTextColor = isMaxWorkerCount ? Colors.warmGrey : Colors.coral

    const textDecorationLine = !isMaxWorkerCount ? 'none' : 'line-through'

    const borderColor = isMaxWorkerCount ? Colors.warmGrey : Colors.steel

    const backgroundColor = isSelected ? Colors.coral : 'transparent'
    return (
      <View key={id} padding={12} style={{ paddingLeft: 30 }}>
        <TouchableOpacity
          style={styles.workshiftContainer}
          disabled={isMaxWorkerCount}
          onPress={() => this.onWorkshiftPress(index)}>
          <TouchableOpacity
            style={styles.workshiftSelectionButton}
            onPress={() => this.onWorkshiftSelect(id, workshiftsDate[selectedDateIndex], index)}>
            {isAvailable && !isMaxWorkerCount && (
              <View
                style={[
                  styles.select,
                  {
                    borderWidth,
                    borderColor,
                    backgroundColor
                  }
                ]}
              />
            )}
          </TouchableOpacity>

          <View>
            <Text bold small color={textColor} style={{ textDecorationLine }}>
              Ca {index + 1}:
            </Text>

            <Text small color={textColor} style={{ textDecorationLine }}>
              {time.in.toUpperCase()} - {time.out.toUpperCase()}
            </Text>
          </View>

          <Text style={[styles.amountText, { textDecorationLine }]} bold small color={amountTextColor}>
            {workerCount.current}/{workerCount.total}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderMarkdown = description => {
    if (description.includes('####')) {
      const a = description.split('####')
      const b = a.map(item => item.split('*'))

      return b.map((i, idx) => {
        if (idx > 0) {
          return i.map((i, idx) => {
            return idx === 0 ? (
              <Text key={idx} bold small>
                {i}
              </Text>
            ) : (
              <Text key={idx} small>
                - {i}
              </Text>
            )
          })
        }
      })
    } else {
      return <Text small>{description}</Text>
    }
  }

  renderFooter = () => {
    const { selectedIndex, selectedDateIndex } = this.state
    const { phoneNumber, workshifts } = this.props.jobDetails

    const status = workshifts[selectedDateIndex].workshifts[selectedIndex[selectedDateIndex]]
      ? workshifts[selectedDateIndex].workshifts[selectedIndex[selectedDateIndex]].freelancerStatus
      : 0

    const isAvailable = status === Constants.WORKSHIFT.AVAILABLE
    const isPending = status === Constants.WORKSHIFT.PENDING
    const isApproved = status === Constants.WORKSHIFT.APPROVED

    const buttonText = isAvailable ? 'ỨNG TUYỂN' : isApproved ? 'ĐÃ DUYỆT' : 'ĐANG CHỜ'

    return (
      <View style={styles.footer} row absolute centerHorizontal>
        <Touchable round={60} onPress={() => this.onPhonePress(phoneNumber)}>
          <Image style={styles.roundButton} source={Icons.call} />
        </Touchable>

        <Touchable round={60}>
          <Image style={styles.roundButton} source={Icons.chat} />
        </Touchable>

        <Button
          style={{
            width: 155,
            borderRadius: 30,
            backgroundColor: isPending || (isApproved && Colors.cloudyBlue)
          }}
          label={buttonText}
          labelColor="white"
          gradient={isAvailable}
          radius={30}
          onPress={() => this.onApply(isAvailable, isPending, isApproved)}
        />
      </View>
    )
  }

  renderPicker = () => {
    const { selectedDateIndex } = this.state

    if (this.state.showModal) {
      return (
        <View
          style={{
            backgroundColor: '#rgba(0,0,0,.5)'
          }}
          center
          absolute>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute'
            }}
            onPress={() => this.setState({ showModal: false })}
          />
          <View style={{ width: '70%', height: '40%', borderRadius: 10 }} background="white">
            <Text center bold style={{ marginTop: 16, marginBottom: 16 }}>
              Vui lòng chọn một ngày
            </Text>

            <ScrollView
              style={{
                margin: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: Colors.coral
              }}>
              {this.state.workshiftsDate.map((text, index) => (
                <TouchableOpacity
                  style={{
                    margin: 16
                  }}
                  onPress={() =>
                    this.setState({
                      showModal: false,
                      selectedDateIndex: index
                    })
                  }>
                  <Text
                    center
                    bold={index === selectedDateIndex ? Colors.coral : ''}
                    color={index === selectedDateIndex ? Colors.coral : ''}>
                    {text}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )
    }
  }

  render() {
    const { jobDetails, isLoading } = this.props
    const { selectedIndex, selectedDateIndex } = this.state

    if (!jobDetails) {
      return null
    }

    const { name, description, date, place, totalApply, payMethod, supplier, workshifts } = jobDetails
    const workshift = workshifts[selectedDateIndex].workshifts[selectedIndex[selectedDateIndex]]
      ? workshifts[selectedDateIndex].workshifts[selectedIndex[selectedDateIndex]]
      : ''
    let totalApplies = `${totalApply}
`
    return (
      <Container
        isLoading={isLoading}
        buttons={{
          left: [
            {
              icon: Icons.back,
              onPress: () => this.props.pop()
            }
          ]
        }}
        statusbarColor="dark-content"
        titleColor="black"
        isDrawnUnderNavbar>
        <ScrollView style={{ paddingTop: 100, marginBottom: '25%' }} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 24 }}>
            <View row>
              {supplier.avatar ? (
                <Image style={styles.supplierAvatar} source={{ uri: supplier.avatar }} />
              ) : (
                <View
                  style={[
                    styles.supplierAvatar,
                    {
                      borderWidth: 1,
                      borderColor: '#EAEAEA'
                    }
                  ]}
                />
              )}

              <View>
                <Text small>{date.publish}</Text>
                <Text bold>{supplier.name}</Text>
              </View>
            </View>

            <View style={styles.workshiftPanel} background="white">
              <View row>
                <Text small bold style={{ flex: 1 }}>
                  Công việc:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 2.8 }}>
                  {name}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold style={{ flex: 1 }}>
                  Đã tuyển:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 2.8 }}>
                  {workshift ? workshift.workerCount.current : ''}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold style={{ flex: 1 }}>
                  Địa chỉ:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 2.8 }}>
                  {place}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold style={{ flex: 1 }}>
                  Ngày làm:
                </Text>

                <View style={{ flex: 2.8 }}>
                  <Text small>{this.state.workshiftsDate[this.state.selectedDateIndex]}</Text>
                </View>
              </View>

              <Text small bold style={{ marginTop: 9 }}>
                Giờ làm:
              </Text>

              {workshifts[this.state.selectedDateIndex].workshifts.map((workshift, index) =>
                this.renderWorkshift(workshift, index)
              )}

              <View row style={{ marginTop: 9, alignItems: 'flex-end' }}>
                <Text small bold>
                  Lương:
                </Text>

                <Text bold color={Colors.coral} style={{ marginLeft: 4 }}>
                  {(workshift && workshift.salary !== 0 && `${convert.toCurrency(workshift.salary)} đ`) ||
                    'Theo năng suất'}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold>
                  Thanh toán:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 1 }}>
                  {payMethod === PAYMENT_METHODS.TRANSFER ? 'Chuyển khoản qua TechcomBank' : 'Tiền mặt'}
                </Text>
              </View>
            </View>

            <View row style={{ marginVertical: 16, alignItems: 'center' }}>
              <Text bold style={{ flex: 3 }}>
                Chi tiết công việc
              </Text>

              <View style={{ flex: 1 }}>
                <Text center bold xlarge color={Colors.coral}>
                  {totalApplies}
                  <Text center bold small color={Colors.coral}>
                    Ứng tuyển
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 100 }}>{this.renderMarkdown(description)}</View>
          </View>
        </ScrollView>

        {this.renderFooter()}

        {/* {this.renderPicker()} */}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  supplierAvatar: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 60 / 2
  },
  workshiftPanel: {
    marginTop: 26,
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: '#EAEAEA',
    paddingHorizontal: 12,
    paddingVertical: 24
  },
  workshiftContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  workshiftSelectionButton: {
    width: 51,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center'
  },
  select: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2
  },
  amountText: {
    flex: 2,
    textAlign: 'right'
  },
  roundButton: {
    width: '115%',
    height: '115%',
    resizeMode: 'contain'
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 12,
    paddingHorizontal: 24,
    justifyContent: 'space-between'
  }
})

const mapStateToProps = state => ({
  jobDetails: selectors.getJobDetails(state),
  applyWorksIssues: selectors.getApplyWorksIssues(state),
  applyWorksMessage: selectors.getApplyWorksMessage(state),

  userInfo: userSelectors.getUser(state),

  status: selectors.getStatus(state, 'getJobDetails'),
  isLoading: selectors.getLoading(state, 'getJobDetails'),
  applyWorksStatus: selectors.getStatus(state, 'applyWorks')
})

const mapDispatchToProps = dispatch => ({
  applyWorks: work => dispatch(jobActions.applyWorks(work)),
  cancelApplyWorks: () => dispatch(jobActions.applyWorksCanceled()),

  getJobDetails: jobId => dispatch(jobActions.getJobDetails(jobId)),
  removeApplyJobMessage: () => dispatch(jobActions.removeApplyJobMessage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDetails)
