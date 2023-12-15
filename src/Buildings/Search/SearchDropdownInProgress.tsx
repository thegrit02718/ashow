import React,{useEffect} from 'react';
import { FlatList,View  } from 'react-native';
import AddressList from './AddressList';
import AptList from './AptList';
import { Divider } from '../../Components/Divider';
import { styles } from './SearchForm';
import { AptItemType } from './SearchForm';

export interface SearchDropdownProps{
  aptList:AptItemType[];
  inputValue:string;
  Err?:any;
}

function SearchDropdownInProgress( {aptList,inputValue,Err}:SearchDropdownProps) {
  const filteredAptList = aptList.filter(item => {
    
    if(item.name.match(new RegExp(inputValue,'gi')) || item.address.match(new RegExp(inputValue,'gi'))){
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
 
  useEffect(() => {
    if (filteredAptList.length === 0 && filteredAddressList.length === 0) {
      Err(true);
    } else {
      Err(false);
    }
  }, [filteredAptList, filteredAddressList]);
  
    return (
      <View style={[styles.pad_24_0,]}>
        <FlatList 
        data={[]}
        renderItem={null}
       
        ListEmptyComponent={
          <>
              <FlatList
               data={filteredAddressList}
               renderItem={({ item, index }) => <AddressList key={index} address={item} value={inputValue} isLastIndex={filteredAddressList.length == index+1}/>}
               keyExtractor={(item, index) => `flatList1_${index}`.toString()}
            
               />
            {filteredAptList.length >= 1 && filteredAddressList.length >= 1 && <Divider height={1} marginVertical={16}/>}
           
            {
              <FlatList
                data={aptList}
                renderItem={({ item, index }) => <AptList key={index} data={item} value={inputValue}/>}
                keyExtractor={(item, index) => `flatList2_${index}`.toString()}
              />
            }
          </>
        }
      />
      </View>
    )
}

export default SearchDropdownInProgress
 
