import React from 'react';
import { FlatList, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SphereProgress } from './Cards/SphereProgress';
import CustomText from './UI/Text';

const data = [
  {
    emoji: require('../assets/images/icons/eye.png'),
    title: 'Питание',
    progress: 10,
    description:
      'К твоему курсу подключены практические задания, которые помогут изменить привычки в питании и сделать рацион более здоровым и сбалансированным. ',
  },
  {
    emoji: require('../assets/images/icons/eye.png'),
    title: 'Питание',
    progress: 10,
    description:
      'К твоему курсу подключены практические задания, которые помогут изменить привычки в питании и сделать рацион более здоровым и сбалансированным. ',
  },
  {
    emoji: require('../assets/images/icons/eye.png'),
    title: 'Питание',
    progress: 10,
    description:
      'К твоему курсу подключены практические задания, которые помогут изменить привычки в питании и сделать рацион более здоровым и сбалансированным. ',
  },
  {
    emoji: require('../assets/images/icons/eye.png'),
    title: 'Питание',
    progress: 10,
    description:
      'К твоему курсу подключены практические задания, которые помогут изменить привычки в питании и сделать рацион более здоровым и сбалансированным. ',
  },
  {
    emoji: require('../assets/images/icons/eye.png'),
    title: 'Питание',
    progress: 10,
    description:
      'К твоему курсу подключены практические задания, которые помогут изменить привычки в питании и сделать рацион более здоровым и сбалансированным. ',
  },
];

export const MyProgress = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(data[0]);

  const openModal = (item: any) => {
    setModalContent(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => 'my-prgress-' + index}
        renderItem={({ item }) => {
          return (
            <SphereProgress
              style={styles.item}
              item={item}
              onPress={() => openModal(item)}
            />
          );
        }}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.touchable}></View>
          </TouchableWithoutFeedback>
          <CustomText>{modalContent.description}</CustomText>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  item: {
    marginHorizontal: 6,
    marginVertical: 16,
  },
  modalContainer: {
    flex: 1,
  },
  touchable: {
    flex: 1,
    backgroundColor: 'blue',
  },
});


import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import WithShadow from '../../hocs/withShadow';
import { ProgressCircle } from '../UI/ProgressCircle';
import CustomText from '../UI/Text';

export const SphereProgress = ({ item, style, onPress }: any) => {
  return (
    <WithShadow style={style}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <ProgressCircle>
            <Image style={styles.emoji} source={item.emoji} />
          </ProgressCircle>
          <CustomText>{item.progress}</CustomText>
          <CustomText>{item.title}</CustomText>
        </View>
      </TouchableOpacity>
    </WithShadow>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 136,
    height: 168,
    alignItems: 'center',
  },
  emoji: {
    width: 64,
    height: 64,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ProgressCircle = ({ children }: any) => {
  return (
    <View style={styles.circle}>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 106,
    height: 106,
    backgroundColor: 'yellow',
  },
  children: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

