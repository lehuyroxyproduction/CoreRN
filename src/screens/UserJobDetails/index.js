import React from 'react'
import { connect } from 'react-redux'
import { Alert, Image, Linking, ScrollView } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { Button, Container } from 'components'
import { Text, Touchable, View } from 'components/uielements'

import {Colors, Styles} from 'themes'

import { Icons, Images } from 'images'

import { actions, selectors } from 'reducers/jobs'

import convert from 'utils/converter'

import { WORK } from 'constants'
import {jobActions} from 'reducers/index'
import {PAYMENT_METHODS} from '../../constants'

class UserJobDetails extends React.Component {
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

  renderHeaderStatus() {
    const { status } = this.props.jobDetails

    let text = ''
    let descriptionText = ''
    let icon = ''
    let width = 70
    let height = 70
    let colors = []

    switch (status) {
      case WORK.PENDING:
        text = 'Đang duyệt...'
        descriptionText = 'Thông tin đăng ký đã được gửi đến khách hàng vui lòng chờ khách hàng duyệt bạn nhé'
        icon = Images.job_waiting
        colors = [Colors.azure, Colors.robinSEgg]
        break
      case WORK.APPROVED:
        text = 'Đã duyệt'
        descriptionText = 'Bạn đã được duyệt vào làm công việc này. Đúng ngày giờ bên dưới bạn vui lòng đến đúng địa chỉ để làm việc'
        icon = Images.job_approved
        width = 60
        height = 60
        colors = [Colors.tealishTwo, Colors.freshGreen]
        break
      case WORK.FINISHED:
        text = 'Hoàn thành'
        descriptionText = 'Chúc mừng bạn đã hoàn thành công việc'
        icon = Images.job_completed
        colors = [Colors.turquoiseBlue, Colors.tealish]
        break
      default:
        break
    }

    return (
      <LinearGradient
        start={{ x: 0.1, y: 0.6 }}
        end={{ x: 0.8, y: 1.0 }}
        colors={colors}
        style={{
          width: '100%',
          height: 230,
          marginBottom: 24,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'powderblue'
        }}>
        <Image
          style={{
            width,
            height,
            marginBottom: 16,
            resizeMode: 'contain'
          }}
          source={icon}
        />

        <Text bold color="white" style={{ marginVertical: 4 }}>
          {text}
        </Text>

        <Text small color="white">
          {descriptionText}
        </Text>
      </LinearGradient>
    )
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
      }, options: {
        ...Styles.modalStyle
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cancelWorkStatus === 'error') {
      this.showAlert({
        type: 'error',
        title: 'Thất bại',
        description: nextProps.cancelWorkMessage,
        onPress: () => this.props.cancelCancelWork(),
        onDismiss: () => this.props.cancelCancelWork()
      })
    }
    // if (this.props.jobDetails !== nextProps.jobDetails) {
    if (nextProps.cancelWorkStatus === 'success') {
      const { cancelWorkIssues } = this.props

      const description = cancelWorkIssues.length
        ? cancelWorkIssues.map(({ message, date, time }, index) => {
          if (index > 0 && message === cancelWorkIssues[index - 1].message) {
            message = ''
          }

          let lineBreak = ''

          if (message) {
            lineBreak = '\n'
          }

          return lineBreak + message + ' ' + '\n' + date + ': ' + time.in + ' - ' + time.out
        })
        : 'Bạn đã hủy đăng ký thành công'

      this.showAlert({
        type: cancelWorkIssues.length ? 'error' : 'success',
        title: cancelWorkIssues.length ? 'Thất bại' : 'Thành công!',
        description,
        onPress: () => {
          this.props.dismissModal()
          this.props.pop()
        },
        onDismiss: () => this.props.cancelCancelWork()
      })
      // }
    }
  }

  onCancelWork = () => {
    const { status } = this.props.jobDetails
    // console.log('--------------onCancelJob-------------', this.props.jobDetails)
    if (status === WORK.APPROVED || status === WORK.PENDING) {
      Alert.alert('', 'Bạn có chắc muốn hủy đăng ký?', [
        {
          text: 'Trở về',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.cancelWork({
              workId: this.props.workId
            })
          }
        }
      ])
    }
  }

  renderFooter() {
    const { status, phoneNumber } = this.props.jobDetails
    return (
      <View
        row
        centerHorizontal
        absolute
        style={{
          left: 0,
          right: 0,
          bottom: 12,

          paddingHorizontal: 24,
          justifyContent: 'center'
        }}>
        <Touchable
          style={{ marginHorizontal: 10 }}
          round={60}
          onPress={() => {
            const url = `tel:${phoneNumber}`

            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + url)
              } else {
                return Linking.openURL(url)
              }
            })
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }}
            source={Icons.call}
          />
        </Touchable>

        <Touchable round={60}>
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }}
            source={Icons.chat}
          />
        </Touchable>

        {status !== WORK.APPROVED && (
          <Button
            label={'HỦY ĐĂNG KÝ'}
            labelColor="white"
            gradient
            radius={30}
            style={{ width: 155 }}
            onPress={this.onCancelWork}
          />
        )}
      </View>
    )
  }

  render() {
    const { jobDetails } = this.props

    if (!jobDetails) {
      return null
    }

    const {
      id,
      name,
      description,
      date,
      place,
      rating,
      payMethod,
      salary,
      supplier,
      totalApply,
      workshifts,
      phoneNumber,
      time,
      workerCount,
      workId
    } = jobDetails

    return (
      <Container
        isLoading={!jobDetails}
        titleColor="white"
        buttons={{
          left: [
            {
              icon: Icons.back,
              onPress: () => this.props.pop()
            }
          ]
        }} isDrawnUnderNavbar>
        <ScrollView style={{ marginBottom: '25%' }} showsVerticalScrollIndicator={false}>
          {this.renderHeaderStatus()}

          <View style={{ paddingHorizontal: 24 }}>
            <View row>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 12,
                  borderRadius: 30
                }}
                source={{ uri: supplier.avatar }}
              />

              <View>
                <Text small>{/* {publishDate} */}</Text>
                <Text bold>{supplier.name}</Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 26,
                borderRadius: 16,
                borderWidth: 0.8,
                borderColor: '#EAEAEA',
                paddingHorizontal: 12,
                paddingVertical: 24
              }}
              background="white">
              <View row>
                <Text small bold>
                  Công việc:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 1 }}>
                  {name}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold>
                  Đã tuyển:
                </Text>

                <Text small style={{ marginLeft: 4 }}>
                  {workerCount.current}/{workerCount.total}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold>
                  Địa chỉ:
                </Text>

                <Text small style={{ marginLeft: 4, flex: 1 }}>
                  {place}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold>
                  Ngày làm:
                </Text>

                <Text small style={{ marginLeft: 4 }}>
                  {time.date}
                </Text>
              </View>

              <View row style={{ marginTop: 9 }}>
                <Text small bold>
                  Giờ làm:
                </Text>

                <Text small style={{ marginLeft: 4 }}>
                  {time.in.toUpperCase()} - {time.out.toUpperCase()}
                </Text>
              </View>

              {/* {this.renderShifts()} */}

              <View row style={{ marginTop: 9, alignItems: 'flex-end' }}>
                <Text small bold>
                  Lương:
                </Text>

                <Text bold color={Colors.coral} style={{ marginLeft: 4 }}>
                  {salary && salary !== 0 && `${convert.toCurrency(salary)} đ` || 'Theo năng suất'}
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
                <Text center bold color={Colors.coral} style={{ fontSize: 32 }}>
                  {totalApply}
                  {'\n'}
                  <Text center bold small color={Colors.coral}>
                    Ứng tuyển
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>{this.renderMarkdown(description)}</View>
          </View>
        </ScrollView>

        {this.renderFooter()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  jobDetails: selectors.getUserJobDetails(state),
  cancelWorkIssues: selectors.getCancelWorksIssues(state),
  cancelWorkMessage: selectors.getCancelWorkMessage(state),

  status: selectors.getStatus(state, 'getUserJobDetails'),
  // isLoading: selectors.getLoading(state, 'getUserJobDetails'),
  cancelWorkStatus: selectors.getStatus(state, 'cancelWork')
})

const mapDispatchToProps = dispatch => ({
  // getUserJobDetails: workId => dispatch(actions.getUserJobDetails(workId)),
  cancelWork: workId => dispatch(jobActions.cancelWork(workId)),
  cancelCancelWork: () => dispatch(jobActions.cancelWorkCanceled()),
  removeCancelWorkMessage: () => dispatch(jobActions.removeCancelWorkMessage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserJobDetails)
