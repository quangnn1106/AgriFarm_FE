import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Font } from "@react-pdf/renderer"


const borderColor = '#000000';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    borderBottomColor: '#000000',
    backgroundColor: '#f3f6f4',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 100,
    textAlign: 'center',
    // fontStyle: 'bold',
    
    flexGrow: 1,
    fontWeight: 'bold',
  },
  season: {
    width: '30%',
    // height:100,
    height: '100%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  qty: {
    width: '20%',
    height: '100%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  output: {
    width: '15%',
    height: '100%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  location: {
    width: '15%',
    height: '100%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  amount: {
    width: '15%',
    height: '100%',
    borderRightColor: borderColor,
  }
});

const TableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.season}>Mùa vụ</Text>
    <Text style={styles.qty}>Sản phẩm</Text>
    <Text style={styles.output}>Năng suất</Text>
    <Text style={styles.location}>Khu vị trí</Text>
    <Text style={styles.amount}>Ngày thu hoạch</Text>
  </View>
);

export default TableHeader;
