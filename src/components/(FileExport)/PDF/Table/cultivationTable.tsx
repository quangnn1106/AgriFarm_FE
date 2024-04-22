import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './tableHeader';
import { CultRecordRow } from '../cultivationPDFDocument';
import TableRows from './tableRows';

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#df544a',
    fontWeight: 'normal',
  }
});

interface IProps{
    data: CultRecordRow[]
}


const CultivationTable = ({data}:IProps) => (
  <View style={styles.tableContainer}>
    <TableHeader />
    <TableRows content={data} />
    {/* <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.items.length} /> */}
    {/* <InvoiceTableFooter items={invoice.items} /> */}
  </View>
);

export default CultivationTable;
