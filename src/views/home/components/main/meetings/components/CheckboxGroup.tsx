import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  label: string;
  isChecked: boolean;
  onToggle: (label: string) => void;
};

type CheckboxGroupProps = {
  options: string[];
};

const Checkbox = ({label, isChecked, onToggle}: Props) => {
  const handleToggle = () => {
    onToggle(label);
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggle}>
      <Ionicons
        name={
          isChecked ? 'radio-button-on-outline' : 'radio-button-off-outline'
        }
        size={25}
        color={'#396593'}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const CheckboxGroup = ({options}: CheckboxGroupProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleToggle = (option: string) => {
    setSelectedOption(option === selectedOption ? '' : option);
  };

  return (
    <View style={styles.checkboxGroupContainer}>
      {options.map(option => (
        <Checkbox
          key={option}
          label={option}
          isChecked={option === selectedOption}
          onToggle={handleToggle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginVertical: 20
  },
  label: {
    fontSize: 13,
    color: "black"
  },
  checkboxGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%'
  }
});

export default CheckboxGroup;
