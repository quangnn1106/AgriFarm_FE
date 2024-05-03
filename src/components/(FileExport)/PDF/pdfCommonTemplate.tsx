
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for your PDF
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "flex",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row"
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: 10,
    },
  });
  
  // Define your data
  const tableData = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Doe', age: 30 },
    { id: 3, name: 'Smith', age: 35 },
  ];
  
  // Create your PDF template component
  const PdfTemplate = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Table 1:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Mùa vụ</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Loại sản phẩm</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Sản lượng</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Age</Text>
              </View>
            </View>
            {tableData.map((row) => (
              <View key={row.id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.id}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{row.age}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
  
  export default PdfTemplate;