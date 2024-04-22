import { Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import CultivationTable from './Table/cultivationTable';
// import seedData from './fakeData';

// Font.register({
//     family: 'Arial',
//     src: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js', // Use your font URL
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//   });

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

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
