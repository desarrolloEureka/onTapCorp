import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type DropdownProps = {
  label: string;
  options: any;
  onSelect: (option: any) => void;
  isEnable: boolean;
};

const Dropdown = ({label, options, onSelect, isEnable}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{backgroundColor: isEnable ? '#396593' : "#888888"}, styles.dropdown]}
        onPress={() => setIsOpen(prev => !prev)}
        disabled={!isEnable}
        >
        <Text style={styles.label}>
          {selectedOption ? selectedOption.name : label}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options &&
            options.map(
              (option: any) =>
                !option?.isDeleted && (
                  <TouchableOpacity
                    onPress={() => handleSelect(option)}
                    style={styles.option}>
                    <Text style={styles.optionText}>{option?.name}</Text>
                  </TouchableOpacity>
                )
            )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  dropdown: {
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '50%',
    maxWidth: '80%'
  },
  label: {
    paddingLeft: 20,
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal'
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 10,
    marginTop: 3
  },
  option: {
    padding: 10
  },
  optionText: {
    color: 'black',
    fontWeight: 'normal'
  }
});

export default Dropdown;