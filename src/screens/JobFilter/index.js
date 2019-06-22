import React from 'react'
import { Text, Touchable, View } from 'components/uielements'
import { connect } from 'react-redux'
import { Colors } from 'themes'
import { Navbar } from 'components/Navbar'
import { Container } from 'components'
import { Navigation } from 'react-native-navigation'
import { hp, wp } from 'constants'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Icons } from 'images'
import Icon from 'react-native-vector-icons/Feather'
import PlaceListItem from 'screens/ListItem/PlaceListItem'
import { placeActions, placeSelectors, jobActions, jobSelectors, userActions, userSelectors } from 'reducers'
import forEach from 'lodash/forEach'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import LoadingView from 'loading/LoadingView'
import ItemList from './ItemList'

class JobFilter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.navigationEventListener = Navigation.events().bindComponent(this)
    this.state = {
      isContractTypesExpanded: true,
      isPaymentMethodsExpanded: true,
      isJobTypesExpanded: true,
      isAreasExpanded: true,
      selectedPlaces: [],
      selectedContractTypes: [],
      selectedPaymentMethods: [],
      selectedCategories: []
    }
  }

  value = {
    initPlaces: [],
    initContractTypes: [],
    initPaymentMethods: [],
    initCategories: []
  }

  componentDidAppear() {
    this.init()
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove()
    }
  }

  init() {
    this.props.getCategories(() => {
      let onSuccess = () => {
        const { userFilterPlaces, selectedContractTypes, selectedPaymentMethods, selectedCategories } = this.props
        // if (userFilterPlaces.length) {
        // console.log('userFilterPlace', userFilterPlaces)
        this.value.initPlaces = []
        this.value.initContractTypes = []
        this.value.initPaymentMethods = []
        this.value.initCategories = []
        forEach(userFilterPlaces, item => this.value.initPlaces.push(item.province_id))
        forEach(selectedContractTypes, item => this.value.initContractTypes.push(item))
        forEach(selectedPaymentMethods, item => this.value.initPaymentMethods.push(item))
        forEach(selectedCategories, item => this.value.initCategories.push(item))

        console.log(
          'init JobFilter=========',
          this.value.initPlaces,
          this.value.initContractTypes,
          this.value.initPaymentMethods,
          this.value.initCategories
        )
        this.setState({
          selectedCategories: this.value.initCategories,
          selectedPlaces: this.value.initPlaces,
          selectedContractTypes: this.value.initContractTypes,
          selectedPaymentMethods: this.value.initPaymentMethods
        })
      }
      this.props.getUserFilterPlaces({ onSuccess })
    }
    )
  }

  onSelectedPlacesChange = selectedPlaces => {
    this.setState({ selectedPlaces })
  }

  onSelectedPaymentMethodsChange = selectedPaymentMethods => {
    this.setState({ selectedPaymentMethods })
  }
  onSelectedJobTypesChange = selectedCategories => {
    this.setState({ selectedCategories })
  }
  onSelectedContractTypesChange = selectedContractTypes => {
    console.log('onSelectedContractTypesChange=============', selectedContractTypes)
    this.setState({ selectedContractTypes })
  }

  renderOptionList = (selectedList, list, uniqueKey, displayKey, onItemsChange) => {
    return (
      <ItemList
        items={list}
        uniqueKey={uniqueKey}
        displayKey={displayKey}
        onSelectedItemsChange={onItemsChange}
        selectedItems={selectedList}
      />
    )
  }

  onSaveBeforeClose = () => {
    let { selectedPlaces, selectedContractTypes, selectedCategories, selectedPaymentMethods } = this.state
    console.log(
      'onSaveBeforeClose-=================',
      selectedContractTypes,
      selectedCategories,
      selectedPaymentMethods
    )
    let tmp = selectedPlaces
    this.props.selectCategories(selectedCategories)
    this.props.selectPaymentMethods(selectedPaymentMethods)
    this.props.selectContractTypes(selectedContractTypes)
    this.setState(
      { selectedPlaces: [], selectedContractTypes: [], selectedPaymentMethods: [], selectedCategories: [] },
      () => {
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
        this.value.initContractTypes = []
        this.value.initPaymentMethods = []
        this.value.initCategories = []
      }
    )
  }

  onConfirm = () => {
    this.onSaveBeforeClose()
    this.props.hideDrawer()
    this.props.getJobs(true)
  }

  renderAreas = () => {
    const { isAreasExpanded, selectedPlaces } = this.state
    const { places } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ isAreasExpanded: !isAreasExpanded })}>
          <View row style={{ width: '100%' }} centerHorizontal>
            <Icon name={isAreasExpanded ? 'chevron-up' : 'chevron-down'} color="gray" />
            <Text bold style={{ flex: 1, start: wp(2) }}>
              Khu vực
            </Text>
          </View>
        </TouchableOpacity>
        {isAreasExpanded &&
          this.renderOptionList(selectedPlaces, places, 'province_id', 'province_name', this.onSelectedPlacesChange)}
      </View>
    )
  }
  renderContractTypes = () => {
    const { isContractTypesExpanded, selectedContractTypes } = this.state
    const { contractTypes } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ isContractTypesExpanded: !isContractTypesExpanded })}>
          <View row style={{ width: '100%' }} centerHorizontal>
            <Icon name={isContractTypesExpanded ? 'chevron-up' : 'chevron-down'} color="gray" />
            <Text bold style={{ flex: 1, start: wp(2) }}>
              Hợp đồng
            </Text>
            {/* <Switch value={allSelected} onAsyncPress={this._onAllConnectorsPress(allSelected)} /> */}
          </View>
        </TouchableOpacity>

        {isContractTypesExpanded &&
          this.renderOptionList(
            selectedContractTypes,
            contractTypes,
            'id',
            'description',
            this.onSelectedContractTypesChange
          )}
      </View>
    )
  }
  renderPaymentMethods = () => {
    const { isPaymentMethodsExpanded, selectedPaymentMethods } = this.state
    const { paymentMethods } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ isPaymentMethodsExpanded: !isPaymentMethodsExpanded })}>
          <View row style={{ width: '100%' }} centerHorizontal>
            <Icon name={isPaymentMethodsExpanded ? 'chevron-up' : 'chevron-down'} color="gray" />
            <Text bold style={{ flex: 1, start: wp(2) }}>
              Hình thức thanh toán
            </Text>
          </View>
        </TouchableOpacity>

        {isPaymentMethodsExpanded &&
          this.renderOptionList(
            selectedPaymentMethods,
            paymentMethods,
            'id',
            'description',
            this.onSelectedPaymentMethodsChange
          )}
      </View>
    )
  }
  renderCategories = () => {
    const { isJobTypesExpanded, selectedCategories } = this.state
    const { categories } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ isJobTypesExpanded: !isJobTypesExpanded })}>
          <View row style={{ width: '100%' }} centerHorizontal>
            <Icon name={isJobTypesExpanded ? 'chevron-up' : 'chevron-down'} color="gray" />
            <Text bold style={{ flex: 1, start: wp(2) }}>
              Loại công việc
            </Text>
          </View>
        </TouchableOpacity>

        {isJobTypesExpanded &&
          this.renderOptionList(selectedCategories, categories, 'category_id', 'name', this.onSelectedJobTypesChange)}
      </View>
    )
  }

  renderHeader() {
    return (
      <View
        row
        background="black"
        style={{
          height: hp(12),
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingVertical: hp(1),
          marginBottom: hp(2),
          paddingHorizontal: wp(3)
        }}>
        <Text color="white" bold>
          Bộ lọc
        </Text>
        <TouchableOpacity onPress={() => this.props.hideDrawer()}>
          <Image source={Icons.close2} />
        </TouchableOpacity>
      </View>
    )
  }

  renderFooter() {
    return (
      <Touchable
        style={{ height: hp(6), width: wp(30), alignSelf: 'center', bottom: hp(3) }}
        gradient
        gradientStyle={styles.buttonGradient}
        onPress={this.onConfirm}>
        <Text bold color="white">
          {'xác nhận'.toUpperCase()}
        </Text>
      </Touchable>
    )
  }

  render() {
    const { isLoading } = this.props
    return (
      <View background={Colors.veryLightPink} flex>
        {this.renderHeader()}
        <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: wp(3) }}>
          {this.renderContractTypes()}
          {this.renderAreas()}
          {this.renderPaymentMethods()}
          {this.renderCategories()}
        </ScrollView>
        {this.renderFooter()}
        {isLoading && <LoadingView />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonGradient: {
    overflow: 'hidden',
    borderRadius: 4
  }
})

const mapStateToProps = state => ({
  isLoading: jobSelectors.getLoading(state, 'getCategories') || placeSelectors.getLoading(state, 'getUserFilterPlaces'),
  selectedContractTypes: userSelectors.getSelectedContractTypes(state),
  selectedPaymentMethods: userSelectors.getSelectedPaymentMethods(state),
  selectedCategories: userSelectors.getSelectedCategories(state),
  categories: jobSelectors.getCategories(state),
  contractTypes: jobSelectors.getContractTypes(state),
  paymentMethods: jobSelectors.getPaymentMethods(state),
  // isLoading: placeSelectors.getLoading('getPlaces') || placeSelectors.getLoading('getUserFilterPlaces') || placeSelectors.getLoading('subscribePlaces') || placeSelectors.getLoading('unSubscribePlaces') || placeSelectors.getLoading('subscribeUnSubscribePlaces'),
  userFilterPlaces: placeSelectors.getUserFilterPlaces(state),
  places: placeSelectors.getPlaces(state)
})

const mapDispatchToProps = {
  getJobs: jobActions.getJobs,
  getPlaces: placeActions.getPlaces,
  getUserFilterPlaces: placeActions.getUserFilterPlaces,
  subscribePlaces: placeActions.subscribePlaces,
  unSubscribePlaces: placeActions.unSubscribePlaces,
  subscribeUnsubcribePlaces: placeActions.subscribeUnSubscribePlaces,
  getCategories: jobActions.getCategories,
  selectCategories: userActions.selectCategories,
  selectPaymentMethods: userActions.selectPaymentMethods,
  selectContractTypes: userActions.selectContractTypes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobFilter)
