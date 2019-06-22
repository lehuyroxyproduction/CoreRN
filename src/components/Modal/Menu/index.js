import * as React from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import {styles} from './styles'
import {Icons, Logos} from 'images'
import I18n from 'react-native-i18n'
import {wp, hp, isAndroid} from 'constant'
import {Themes} from 'themes'

export interface MenuProps {


    NameUser?: string;
    Points?: string;
    Avatar?: string;
    Close?: string;
    Logout?: ()=>void;
    ACTIVITIES?: ()=> void;
    EVENTS?: ()=> void;
    CHALLENGES?: ()=>void;
    VIRTUALRACE?: ()=>void;
    REWARDS?: ()=>void;
    MYPROFILE?: ()=>void;
    HISTORY?: ()=>void;
}

export const Menu = (props: MenuProps) => {
  const {
    NameUser,
    Avatar,
    Close,
    Points,
    Logout,
    ACTIVITIES,
    EVENTS,
    CHALLENGES,
    VIRTUALRACE,
    REWARDS,
    MYPROFILE,
    HISTORY
  } = props

  buttonClose = (Close) => {
    return (
      <TouchableOpacity style={styles.buttonClose} onPress={Close}>
        <Image source={Icons.icClose} />
      </TouchableOpacity>
    )
  }
  menuHeader = (NameUser, Points, Avatar) => {
    return (
      <View style={styles.Header}>
        <View style={styles.contentHeader}>
          <View style={styles.viewContentHeader}>
            <Image source={Avatar} style={styles.imageViewContentHeader} />
            <Image source={  Icons.icKing} style={styles.iconImageViewContentHeader} />
          </View>
          <View style={styles.textViewContentHeader}>
            <Text style={styles.titleTextViewContentHeader}>{NameUser}</Text>
            <Text style={styles.contentTextViewContentHeader}> {Points + I18n.t('Point')} ></Text>
          </View>
        </View>
      </View>
    )
  }
  menuContent = (ACTIVITIES, EVENTS, CHALLENGES, VIRTUALRACE, REWARDS, MYPROFILE, HISTORY) => {
    return (
      <View style={styles.Content}>
        <View style={styles.listContent}>
          <TouchableOpacity onPress={ACTIVITIES}><Text
            style={styles.textListContent}>{I18n.t('ACTIVITIES')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={EVENTS}><Text
            style={styles.childTextListContent}>{I18n.t('EVENTS')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={CHALLENGES}><Text
            style={styles.childTextListContent}>{I18n.t('CHALLENGES')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={VIRTUALRACE}><Text
            style={styles.childTextListContent}>{I18n.t('VIRTUALRACE')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={REWARDS}><Text
            style={styles.childTextListContent}>{I18n.t('REWARDS')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={MYPROFILE}><Text
            style={styles.childTextListContent}>{I18n.t('MYPROFILE')}
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HISTORY}><Text
            style={styles.childTextListContent}>{I18n.t('HISTORY')}
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  menuFooter = (Logout) => {
    return (
      <View style={styles.Footer}>
        <TouchableOpacity style={styles.buttonFooter} onPress={Logout}>
          <Image source={Icons.icLogout} width={hp(3)} />
          <Text style={styles.textFooter}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.Containner}>
      {this.buttonClose(Close)}
      {/* header */}
      {this.menuHeader(NameUser, Points, Avatar)}
      {/* content */}
      {this.menuContent(ACTIVITIES, EVENTS, CHALLENGES, VIRTUALRACE, REWARDS, MYPROFILE, HISTORY)}
      {/* footer */}
      {this.menuFooter(Logout)}

    </View>
  )
}

Menu.defaultProps = {
  NameUser: 'Liv3ly Member',
  Points: '0',
  Avatar: Logos.logo3,
  Logout: () => {
  },
  Close: () => {
  },
  ACTIVITIES: () => {
  },
  EVENTS: () => {
  },
  CHALLENGES: () => {
  },
  VIRTUALRACE: () => {
  },
  REWARDS: () => {
  },
  MYPROFILE: () => {
  },
  HISTORY: () => {
  }
}
