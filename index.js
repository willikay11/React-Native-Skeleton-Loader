import React, { Component } from 'react';

import {
  View,
  Animated,
  Easing,
} from 'react-native'
import PropTypes from 'prop-types'

const defaultRows = 1;
const defaultColor = '#dfdfdf';
const defaultHighlightColor = '#c8c8c8';
const defaultCircleSize = 100;
const defaultSquareSize = 100;
const defaultRectangleHeight = 15;

export default class Skeleton extends Component {

  constructor () {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0), 
    }
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
  }

  componentDidMount () {
    this.fadeIn();
  }

  fadeIn () {
    Animated.timing(          
      this.state.fadeAnim,
      {
        toValue: 1,           
        duration: 1000,       
        easing: Easing.linear
      }
    ).start(this.fadeOut);            
  }

  fadeOut() {
    this.setState({ fadeAnim: new Animated.Value(1) },
    () => {
      Animated.timing(          
        this.state.fadeAnim, 
        {
          toValue: 0.2,      
          duration: 1000,    
          easing: Easing.linear
        }
      ).start(this.fadeIn);
    })            
  }


  render () {
    let { fadeAnim } = this.state;

    let { type, size, color, highlightColor, height, rows, loading, children } = this.props;

    if (type === 'square') {
        return (
            <Square 
                fadeAnim={fadeAnim} 
                loading={loading} 
                children={children} 
                color={color ? color : defaultColor} 
                highlightColor={highlightColor ? highlightColor : defaultHighlightColor} 
                size={size ? parseInt(size, 10) : defaultSquareSize} 
            />
        );
    }

    if (type === 'circle') {
        return (
            <Circle 
                fadeAnim={fadeAnim} 
                loading={loading} 
                children={children} 
                color={color ? color : defaultColor} 
                highlightColor={highlightColor ? highlightColor : defaultHighlightColor} 
                size={size ? parseInt(size, 10) : defaultCircleSize} 
            />
        );  
    }

    if (type === 'rectangle') {
        let rowCount = defaultRows;

        if (rows > 0) {
            rowCount = parseInt(rows);
        }

        return <Rectangle 
            fadeAnim={fadeAnim} 
            loading={loading} 
            children={children} 
            rows={rowCount} 
            color={color ? color : defaultColor}
            highlightColor={highlightColor ? highlightColor : defaultHighlightColor} 
            height={height ? parseInt(height, 10) : defaultRectangleHeight} 
        />
    }

    return null;
  }
}

 Square = (props) => {
     if (props.loading) {
         return (
            <View style={{ backgroundColor: props.color, height: props.size, width: props.size }}>
                <Animated.View style={{ opacity: props.fadeAnim }} >
                    <View style = {{ backgroundColor: props.highlightColor, height: props.size, width: props.size }}>
                    </View>
                </Animated.View>
            </View>
        );
     }

     return props.children ? props.children : null;
}

const Rectangle = (props) => {
    if(props.loading) {

        let rectangles = [];

        for (let i = 0; i < props.rows; i++) {
            rectangles.push(
                <View key={i} style={{ backgroundColor: props.color, marginLeft: 5, marginBottom: 10 }}>
                    <Animated.View style={{ opacity: props.fadeAnim }} >
                        <View style = {{ backgroundColor: props.highlightColor, height: props.height }}>
                        </View>
                    </Animated.View>
                </View>
            );
        }
        return rectangles;
    }

    return props.children ? props.children : null;
}

const Circle = (props) => {
    if(props.loading) {
        return (
            <View style={{ backgroundColor: props.color, height: props.size, width: props.size, borderRadius: parseInt(props.size, 10)/2 }}>
                <Animated.View style={{ opacity: props.fadeAnim }} >
                    <View style = {{ backgroundColor: props.highlightColor, height: props.size, width: props.size, borderRadius: parseInt(props.size, 10)/2 }}>
                    </View>
                </Animated.View>
            </View>
        );  
    }

    return props.children ? props.children : null;
}


Skeleton.propTypes = {
  type: PropTypes.oneOf(['rectangle', 'square', 'circle']).isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  rows: PropTypes.number,
}