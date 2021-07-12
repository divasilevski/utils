import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
} from 'react-native';
import Constants from 'expo-constants';
import CustomText from './UI/Text';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import useToggle from '../hooks/useToggle';

const settings = require('../assets/images/icons/settings.png');
const arrow = require('../assets/images/icons/arrow-back.png');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const CourseHeader = () => {
  const navigation = useNavigation();
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const [daysPanel, toggleDaysPanel] = useToggle(false);

  const openDaysPanel = () => {
    toggleDaysPanel();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: daysPanel ? 0 : 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  return (
    <View style={styles.header}>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomText type="courseHeaderMore">Ещё курсы</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.settings} source={settings} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openDaysPanel}>
        <View style={styles.day}>
          <CustomText type="h0">Неделя 0, день 6 </CustomText>
          <Animated.Image
            style={{
              ...styles.arrow,
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '270deg'],
                  }),
                },
              ],
            }}
            source={arrow}
          />
        </View>
      </TouchableOpacity>

      {daysPanel && (
        <View
          style={{ flexGrow: 1, height: 100, backgroundColor: 'red' }}
        ></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // height: 95 + Constants.statusBarHeight, // TO DO
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  settings: {
    width: 25,
    height: 25,
  },
  day: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 25,
    height: 25,
    marginLeft: 4,
  },
});
