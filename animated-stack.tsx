import * as React from 'react';
import { View, StyleSheet, FlatList, Animated, StyleProp, ViewStyle } from 'react-native';

type FlatListProps = FlatList['props'];

interface AnimatedStackProps extends FlatListProps {
  positionIndex: number;
  cellStyle?: StyleProp<ViewStyle>; // TO DO Нужен, нет?
  data: Array<any>;
}

export const AnimatedStack = (props: AnimatedStackProps) => {
  const {
    style,
    data,
    keyExtractor,
    renderItem,
    positionIndex,
    cellStyle,
    ...otherProps
  } = props;

  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    scrollXIndex.setValue(positionIndex);
  }, [positionIndex]);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <FlatList
      {...otherProps}
      data={data}
      keyExtractor={keyExtractor}
      horizontal
      inverted
      scrollEnabled={false}
      removeClippedSubviews={false}
      contentContainerStyle={[styles.container, style]}
      CellRendererComponent={({ item, index, children, style, ...props }) => {
        const newStyle = [
          style,
          { zIndex: index === positionIndex ? 100 : data.length - index },
          styles.cell,
          cellStyle,
        ];
        return (
          <View style={newStyle} index={index} {...props}>
            {children}
          </View>
        );
      }}
      renderItem={(itemProps) => {
        const { index } = itemProps;
        const inputRange = [index - 1, index, index + 1];
        const translateY = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [-24, 0, 100],
        });
        const scale = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [0.95, 1, 1.3],
        });
        const opacity = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [1 - 1 / 3, 1, 0],
        });
        return (
          <Animated.View
            style={{
              ...styles.item,
              opacity,
              transform: [{ translateY }, { scale }],
            }}
          >
            {renderItem && renderItem(itemProps)}
          </Animated.View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
    bottom: 0,
    top: 50,
    right: 0,
    left: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Quiz } from '../../assets/types/quiz.types';
import WithShadow from '../../hocs/withShadow';
import { AnimatedStack } from '../UI/AnimatedStack';
import CustomButton from '../UI/Button';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { QuizStart } from './QuizStart';

interface QuizStackProps {
  position: number;
  results: number[];
  quiz: Quiz[];
  onNext: () => void;
  resultsChanged: (optionId: number) => void;
}

export const QuizStack = (props: QuizStackProps) => {
  const { position, results, quiz, onNext, resultsChanged } = props;
  return (
    <AnimatedStack
      data={[0,...quiz]}
      positionIndex={position}
      keyExtractor={(_: any, index: number) => 'quiz-stack-' + index}
      renderItem={({ item, index }: any) => {
        return (
          <WithShadow style={styles.itemShadow}>
            {index === 0 ? (
              <QuizStart />
            ) : (
              <QuizQuestion
                result={results[position - 1]}
                question={item}
                resultsChanged={resultsChanged}
              />
            )}
            <CustomButton
              title={'Далее'}
              onPress={onNext}
              disabled={!!position && results[position - 1] === undefined}
              black
            />
          </WithShadow>
        );
      }}

    />
  );
};

const styles = StyleSheet.create({
  itemShadow: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
});

      
