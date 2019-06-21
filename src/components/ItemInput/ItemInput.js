import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label, Text } from 'native-base';
import PropTypes from 'prop-types';

type Props = {
  title: string,
  errorText: string,
  horizontal: boolean,
  style: any,
  children: any,
}

class ItemInput extends Component<Props> {
  render() {
    const { title, errorText, horizontal } = this.props;

    if (horizontal === true) {
      return (
        <Item
          style={[styles.containerHorizontal, this.props.style]}
        >

          <Label style={[styles.labelHorizontal]}>
            {title}
          </Label>

          { this.props.children }

          { errorText 
            ? (
              <Text style={styles.errorText}>
                {errorText}
              </Text>
            )
            : null
          }
        </Item>
      );
    }

    return (
      <Item
        stackedLabel
        style={[styles.containerVertical, this.props.style]} 
      >

        <Label style={[styles.labelVertical]}>
          {title}
        </Label>

        { this.props.children }

        { errorText 
          ? (
            <Text style={styles.errorText}>
              {errorText}
            </Text>
          )
          : null
        }
      </Item>
    );
  }
}

/* ItemInput.prototype = {
  children: PropTypes.any,
  style: PropTypes.any,
  title: PropTypes.string,
  
}; */

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
  },
  containerVertical: {

  },
  labelHorizontal: {
    paddingTop: 0,
    alignSelf: 'center',
  },
  labelVertical: {

  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

export default ItemInput;
