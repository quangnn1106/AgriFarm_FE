import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs'
import { CultRecordRow } from '../cultivationPDFDocument';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold'
  },
  season: {
    width: '20%',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  product: {
    width: '30%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8
  },
  output: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8
  },
  location: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'right',
    paddingRight: 8
  },
  harvest: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8
  }
});



interface IProps{
  content: CultRecordRow[]
}

const TableRows = ({content}:IProps) => {
  const rows = content.map(item => (
    <View
      style={styles.row}
      key={item.id}
    >
      <Text style={styles.season}>{`${
        item.season.title
      } (${dayjs(item.season.start).year()})`}</Text>
      <Text style={styles.product}>{item.productName}</Text>
      <Text style={styles.output}>{item.output}{`(${item.unit})`}</Text>
      <Text style={styles.location}>{item.location}{`(${item.location})`}</Text>
      <Text style={styles.harvest}>{dayjs(item.harvestDate).format("DD/MM/YYYY")}</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default TableRows;
