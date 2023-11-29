
import React, { ReactNode, ReactElement, createContext, useState, Dispatch, SetStateAction } from 'react';
import Layout from '../Layout';
import { View } from 'react-native';
import { useContext } from 'react';
import List from './List'
import Trigger from './Trigger';
import Panel from './Panel';

interface TabsProps {
    defaultValue: number;
    children: React.ReactNode;  
}
  
interface TabsContextProps {
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const TabsContext = createContext<TabsContextProps | null>(null);

const Tabs = ({ defaultValue = 0, children }:TabsProps):ReactElement => {
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultValue);
  
    const providerValue: TabsContextProps = { selectedIndex, setSelectedIndex };
  
    return (
      <TabsContext.Provider value={providerValue}>
        <View style={{flex:1,width:'100%',height:"100%"}}>
            {children}
        </View>
      </TabsContext.Provider>
    );
  };


Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

export default Tabs;
