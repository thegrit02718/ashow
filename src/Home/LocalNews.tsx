import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const LocalNews = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>서울</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {borderLeftWidth: 0.5}]}>
          <Text style={styles.buttonText}>경기/인천</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>부산/울산/경남</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {borderLeftWidth: 0.5}]}>
          <Text style={styles.buttonText}>대구/경북</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>광주/전라</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {borderLeftWidth: 0.5}]}>
          <Text style={styles.buttonText}>대전/충청/세종</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, {borderBottomWidth: 0.5}]}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>강원</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {borderLeftWidth: 0.5}]}>
          <Text style={styles.buttonText}>제주</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // 흰색으로 변경
  },
  row: {
    height: 48,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'gray', // 회색 테두리 추가
    borderTopWidth: 0.5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default LocalNews;
