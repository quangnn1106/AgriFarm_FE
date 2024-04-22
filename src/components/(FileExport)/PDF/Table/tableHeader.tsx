import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Font } from "@react-pdf/renderer"


const borderColor = '#90e5fc';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    borderBottomColor: '#df544a',
    backgroundColor: '#df544a',
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
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  qty: {
    width: '20%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  output: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  location: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  amount: {
    width: '15%'
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
