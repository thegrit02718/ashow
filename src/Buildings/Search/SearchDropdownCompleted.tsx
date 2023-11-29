import React,{useEffect} from 'react'
import Tabs from '../../Components/Tab/Tabs';
import { View,Text } from 'react-native';
import  { SearchDropdownProps }  from './SearchDropdownInProgress';
import { FlatList } from 'react-native';
import AddressList from './AddressList';
import AptList from './AptList';
import { styles } from './SearchForm';
import { Divider } from '../../Components/Divider';
import { Typography } from '../../Components/Typography';
import AddressNoResult from './AddressNoResult';
import AptNoresult from './AptNoResult'

export default function SearchDropdownCompleted(props : SearchDropdownProps ) {
    const {aptList, inputValue } = props
    
    const filteredAptList = aptList.filter(item => {
    
      if(item.name.match(new RegExp(inputValue,'gi')) || item.address.match(new RegExp(inputValue,'gi'))) {
       return true
      }
      return false
  
    }).map(item => item.name);
  
    const filteredAddressList = aptList
    .filter((item) => {
      
      if(item.address.match(new RegExp(inputValue, 'g'))){
        return true
      }
      return false
    })
    .map((item) => item.address);
    return (
        <View style={{flex:1}}>
            <Tabs defaultValue={1}>
                <Tabs.List>
                    <Tabs.Trigger value={1} text="전체" />
                    <Tabs.Trigger value={2} text="아파트" />
                    <Tabs.Trigger value={3} text="지역" />
                </Tabs.List>
                <Tabs.Panel value={1}>
                    <View style={[styles.flexBox]}>
                       {inputValue.length !== 0 && 
                          <FlatList 
                          data={[]}
                          style={{flex:1,}}
                          renderItem={null}
                          ListEmptyComponent={
                          <>
                          <View style={{marginBottom:20}}>
                          { filteredAptList.length >= 1 && <FlatList
                            style={styles.serachResultBox}
                            ListHeaderComponent={<View style={{marginTop:10}}><Typography fontSize={18} color='#1B1B1B' fontWeightIdx={0} marginBottom={12}>아파트</Typography></View>}
                            data={aptList}
                            renderItem={({ item, index }) => <AptList key={index} data={item} value={inputValue}/>}
                            keyExtractor={(item, index) => `flatList2_${index}`.toString()}
                          /> }
                          </View>
                            { filteredAddressList.length >= 1 && 
                              <FlatList
                              style={styles.serachResultBox}
                              ListHeaderComponent={<View style={{marginTop:10}}><Typography fontSize={18} color='#1B1B1B' fontWeightIdx={0} marginBottom={12}>아파트</Typography></View>}
                              data={aptList}
                              renderItem={({ item, index }) => <AptList key={index} data={item} value={inputValue}/>}
                              contentContainerStyle={{ paddingVertical: 16 }}
                              keyExtractor={(item, index) => `flatList2_${index}`.toString()}
                             />}
                          </>
                          }
                        />}
                       
                    </View>
                </Tabs.Panel>
                <Tabs.Panel value={2}>
                   {inputValue.length !== 0 &&  filteredAptList.length >= 1 ? <FlatList
                      style={styles.serachResultBox}
                      ListHeaderComponent={<View style={{marginTop:10}}><Typography fontSize={18} color='#1B1B1B' fontWeightIdx={0} marginBottom={12}>아파트</Typography></View>}
                      data={aptList}
                      renderItem={({ item, index }) => <AptList key={index} data={item} value={inputValue}/>}
                      contentContainerStyle={{ paddingVertical: 16 }}
                      keyExtractor={(item, index) => `flatList2_${index}`.toString()}
                     />
                     :
                     <AptNoresult />
                     }
                </Tabs.Panel>
                <Tabs.Panel value={3}>
                { inputValue.length !== 0 && filteredAddressList.length >= 1 ?
                 <FlatList
                   style={styles.serachResultBox}
                   data={filteredAddressList}
                   ListHeaderComponent={<View style={{marginTop:10}}><Typography fontSize={18} color='#1B1B1B' fontWeightIdx={0} marginBottom={12}>지역</Typography></View>}
                   renderItem={({ item, index }) => <AddressList key={index} address={item} value={inputValue} />}
                   contentContainerStyle={{ paddingVertical: 16 }}
                   keyExtractor={(item, index) => index.toString()}
                 />
                  : <AddressNoResult />
                }
                </Tabs.Panel>
            </Tabs>
        </View>
    )
}


