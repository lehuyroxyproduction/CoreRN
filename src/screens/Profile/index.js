import React from 'react'
import { Alert, Image } from 'react-native'
import { connect } from 'react-redux'

import { Container } from 'components'
import { View } from 'components/uielements'

import { Icons } from 'images'

import PersonalInfo from './PersonalInfo'
import Guardians from './Guardians'
import Banks from './Banks'

import Slider, { TAB_1_POS, TAB_2_POS, TAB_3_POS } from './Slider'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pos: TAB_1_POS, onEditMode: false }
  }

  render() {
    const { pos, onEditMode } = this.state
    return (
      <Container
        titleColor="black"
        buttons={{
          left: [
            {
              icon: Icons.back,
              onPress: () => {
                if (this.state.onEditMode) {
                  Alert.alert('', 'Các thay đổi vẫn chưa được lưu, bạn có chắc muốn rời khỏi?', [
                    {
                      text: 'Hủy',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'OK',
                      onPress: () => this.props.pop()
                    }
                  ])
                } else {
                  this.props.pop()
                }
              }
            }
          ]
        }}>
        <Slider onEditMode={onEditMode} onSelectionChange={pos => this.setState({ pos })} />

        {pos === TAB_1_POS && (
          <PersonalInfo
            {...this.props}
            callbackAvatar={this.props.callbackAvatar}
            isEditMode={isEditMode => this.setState({ onEditMode: isEditMode })}
          />
        )}

        {pos === TAB_2_POS && (
          <Guardians {...this.props} isEditMode={isEditMode => this.setState({ onEditMode: isEditMode })} />
        )}

        {pos === TAB_3_POS && (
          <Banks {...this.props} isEditMode={isEditMode => this.setState({ onEditMode: isEditMode })} />
        )}
      </Container>
    )
  }
}
