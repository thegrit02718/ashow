import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Typography } from '../../Components/Typography';
import { SubTitle } from '../../Components/SubTitle';
import MainVersion from '../../../MainVersion';

function VersionInfo (props : any) {
    return (
      <View style={{flex:1}}>
       <SubTitle title='문의하기' navigation={props.navigation}/>
       <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
          <Typography marginBottom={10}> 현재 버전 </Typography>
                                {/* MainURL확인하기 */}
          <Typography marginBottom={10}> {MainVersion} </Typography>
        </View>
    </View>
    );
  }

export default VersionInfo ;
