import React from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import {Chip, Text} from 'react-native-paper';
import {colors} from '../styles';

interface ChipsGridProps {
  data: any[];
  onSelect: (item: any) => void;
  selectedId: any;
  type: 'date' | 'time';
}

const ChipsGrid: React.FC<ChipsGridProps> = ({
  data,
  onSelect,
  selectedId,
  type,
}) => {
  const windowWidth = useWindowDimensions().width;

  const handleChipPress = (item: number) => {
    onSelect(item);
  };

  const calculateChipWidth = (text: string) => {
    const textWidth = text.length * (type === 'date' ? 8 : 15); // Assuming each character takes 8 units of width
    return textWidth + 32; // Adding padding to the chip
  };

  const renderChips = () => {
    return data?.map((chip: any, index: number) => (
      <Chip
        key={index}
        style={[
          styles.chipNotSelected,
          {
            //  width: calculateChipWidth(chip.value),
            backgroundColor:
              chip?.value === selectedId?.value
                ? 'rgba(245, 71, 73, 0.3)'
                : 'white',
          },
        ]}
        onPress={() => handleChipPress(chip)}
        mode="outlined">
        <Text style={{alignSelf: 'center'}}>{chip.value}</Text>
      </Chip>
    ));
  };

  return <View style={styles.container}>{renderChips()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  chipSelected: {
    alignItems: 'center',
    margin: 4,
    borderRadius: 30,
    borderColor: colors.primaryColor,
    width: 'auto',
  },
  chipNotSelected: {
    alignItems: 'center',

    margin: 4,
    borderRadius: 30,
    borderColor: colors.primaryColor,
    width: 'auto',
  },
});

export default ChipsGrid;
