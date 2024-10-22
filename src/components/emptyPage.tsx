import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

interface EmptyPageProps {
  text: string;
}

export const EmptyPage: React.FC<EmptyPageProps> = ({text}) => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text variant="headlineSmall"> {text} </Text>
    </SafeAreaView>
  );
};
