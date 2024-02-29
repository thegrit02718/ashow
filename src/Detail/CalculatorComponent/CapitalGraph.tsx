import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Typography } from '../../Components/Typography';
import FormatNumber from '../../Components/FormatNumber';
const screenWidth = Dimensions.get("window").width;



interface GraphBoxProps {
  date : string,
  name : string,
  cost : number,
  per1: number,
  per2:  number;
}

const GraphBox : React.FC<GraphBoxProps> = ({ date, name, cost, per1, per2 }) => (
  <View style={{flexDirection:'row', height:100, borderBottomWidth:1, borderBottomColor:'#EAEAEA'}}>
    <View style={{width:'25%', alignItems:'flex-start', justifyContent:'center'}}>
      <Typography fontSize={13}>{date}</Typography>
      <Typography fontSize={12} color='#8C8C8C'>{name}</Typography>
    </View>
    <View style={{width:'45%', height:100}}>
      <View style={{flexDirection:'row', width:'100%', height:100}}>
        {/* 뒷배경 */}
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA'}}></View>
        <View style={{width:'10%', height:'100%', borderLeftWidth:1, borderLeftColor:'#EAEAEA', borderRightWidth:1, borderRightColor:'#BDBDBD'}}></View>
        {/* 막대그래프 */}
        <View style={{position:'absolute', width:'100%', height:'40%', top:'30%', left:0}}>
          <View style={{width:`${per1}%`, height:'50%', backgroundColor:'#FF7474', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}>
          </View>
          <View style={{position:'absolute', left:`${per1+1}%`, top:'6%'}}>
            <View style={{width:`${per1}%`}}></View>
            <Typography fontSize={10}>{per1}%</Typography>
          </View>
          <View style={{width:`${per2}%`, height:'50%', backgroundColor:'#EFEFEF', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}>
          </View>
          <View style={{position:'absolute', left:`${per2+1}%`, top:'55%'}}>
            <View style={{width:`${per2}%`}}></View>
            {
              per2 !== 0 ? <Typography fontSize={10} color='#8C8C8C'>{per2}%</Typography> : null
            }
          </View>
        </View>
      </View>
    </View>
    <View style={{width:'10%'}}></View>
    <View style={{width:'20%',  alignItems:'flex-end', justifyContent:'center', borderLeftWidth:1, borderLeftColor:'#BDBDBD'}}>
      <Typography fontSize={14}>{FormatNumber(cost)}</Typography>
    </View>
    
   </View>
);

export default function CapitalGraph () {

  return (
    <View style={{marginVertical:20}}>
      <View style={{flexDirection:'row', height:25, borderBottomWidth:1, borderColor:'#EAEAEA'}}>
        <View style={{width:'25%', alignItems:'flex-start', justifyContent:'center'}}>
          <Typography fontSize={12} color='#8C8C8C'>(%)</Typography>
        </View>
        
        <View style={{width:'45%', height:100}}>
          <View style={{flexDirection:'row', width:'100%', height:25}}>
            <View style={{width:'20%', height:'100%', alignItems:'flex-end', justifyContent:'center'}}>
              <Typography fontSize={12}>20</Typography>
            </View>
            <View style={{width:'40%', height:'100%', alignItems:'flex-end', justifyContent:'center'}}>
              <Typography fontSize={12}>60</Typography>
            </View>
            <View style={{width:'40%', height:'100%', alignItems:'flex-end', justifyContent:'center'}}>
              <Typography fontSize={12}>100</Typography>
            </View>
          </View>
        </View>
        <View style={{width:'10%'}}></View>
        <View style={{width:'20%', alignItems:'flex-end', justifyContent:'center'}}>
          <Typography fontSize={14}>필요자본금</Typography>
        </View>

      </View>

      <GraphBox date='2023.09.01' name='계약일' cost={11615000} per1={3} per2={3}/>
      <GraphBox date='2023.10.25' name='중도금 납부' cost={11615000} per1={20} per2={23}/>
      <GraphBox date='2023.11.25' name='잔금 | 입주일' cost={11615000} per1={77} per2={100}/>

      <GraphBox date='총합계' name='' cost={11615000} per1={100} per2={0}/>

      

    </View>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});