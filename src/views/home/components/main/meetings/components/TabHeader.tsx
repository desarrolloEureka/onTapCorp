import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {meetingsStyles} from '../styles/meetingsStyles';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

function TabHeader({activeTab, setActiveTab}: Props) {
  return (
    <View style={meetingsStyles.containerTab}>
      <TouchableOpacity
        style={[
          meetingsStyles.tab,
          activeTab === 'tab1' && meetingsStyles.activeTab
        ]}
        onPress={() => setActiveTab('tab1')}>
        <Text
          style={[
            meetingsStyles.tabText,
            activeTab === 'tab1' && meetingsStyles.tabTextSelected
          ]}>
          Nueva Reunión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          meetingsStyles.tab,
          activeTab === 'tab2' && meetingsStyles.activeTab
        ]}
        onPress={() => setActiveTab('tab2')}>
        <Text
          style={[
            meetingsStyles.tabText,
            activeTab === 'tab2' && meetingsStyles.tabTextSelected
          ]}>
          Historial Reuniones
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TabHeader;
