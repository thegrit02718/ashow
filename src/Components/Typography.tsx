import React, { useState } from 'react';
import { Text } from 'react-native';

const fontFamilies = ['Pretendard-Bold', 'Pretendard-Regular', 'Pretendard-Light', 'Pretendard-Thin']

export const Typography:React.FC<{
    fontWeightIdx?: number,
    color?:string,
    fontSize?:number,
    marginBottom?:number,
    children:React.ReactElement | any | React.ReactElement[]
}> = (props)=>{
    
    return (
        <Text 
            style={{
                fontFamily: fontFamilies[props.fontWeightIdx ?? 0] ?? 'Pretendard-Regular',
                color: props.color ?? '#1B1B1B',
                fontSize: props.fontSize ?? 16,
                marginBottom: props.marginBottom ?? null
            }}
            >
            {props.children}
        </Text>
    )
}


