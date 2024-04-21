import { Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CultivationTable from './Table/cultivationTable';
// import seedData from './fakeData';
// import Roboto from '@/assets/fonts/Roboto/Roboto-Regular.ttf'
// import robotoRegular from '../../../assets/fonts/Roboto/Roboto-Regular.ttf';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local'

// const local = localFont({src:'../../../assets/fonts/Roboto/Roboto-Bold.ttf'})
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto/Roboto-Regular.ttf', fontWeight:400 },
    { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 600 }
  ],
  format: 'truetype'
});
// const roboto = Roboto({
//   weight: ['400', '700'],
//   style: ['normal'],
//   subsets: ['vietnamese'],
//   display: 'auto',
// })

const styles = StyleSheet.create({
  
  page: {
    fontFamily: 'Roboto',
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

interface IProps {
  data: CultRecordRow[];
}

export const CultDocument = ({ data }: IProps) => (
  <Document>
    <Page
      size='A4'
      style={styles.page}
    >
      <CultivationTable data={data} />
    </Page>
  </Document>
);
