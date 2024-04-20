import { Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CultivationTable from './Table/cultivationTable';
// import seedData from './fakeData';

// Font.register({
//     family: 'Arial',
//     src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js', // Use your font URL
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//   });
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column'
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export interface CultRecordRow {
  id: string;
  season: {
    title: string;
    start: Date;
    end: Date;
  };
  productName: string;
  output: number;
  unit: string;
  location: string;
  harvestDate: Date;
}

// const data = seedData

interface IProps{
  data: CultRecordRow[]
}

export const CultDocument = ({data}:IProps) => (
  <Document>
    <Page
      size='A4'
      style={styles.page}
    >
      <CultivationTable data={data} />
    </Page>
  </Document>
);
