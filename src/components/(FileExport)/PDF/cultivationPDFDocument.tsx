'use client';
import { Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CultivationTable from './Table/cultivationTable';
// import seedData from './fakeData';
// import Roboto from '../../../assets/fonts/Roboto/Roboto-Regular.ttf'
import robotoRegular from '../../../assets/fonts/Roboto/Roboto-Bold.ttf';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

// const local = localFont({src:'../../../assets/fonts/Roboto/Roboto-Bold.ttf'})
// Font.register({
//   family: 'Roboto',
//   fonts: [
//     { src: robotoRegular}
//   ],
//   format: 'truetype'
// });

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/Roboto/Roboto-Regular.ttf',
    },
    {
      src: '/fonts/Roboto/Roboto-Bold.ttf',
      fontWeight: 'bold'
    }
  ],
  // fontWeight: 'normal'
});



const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 10,
    borderColor: '#df544a',
    // paddingTop: 20,
    // paddingLeft: 30,
    // paddingRight: 40,
    // lineHeight: 1.5,
    display: 'flex',
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
