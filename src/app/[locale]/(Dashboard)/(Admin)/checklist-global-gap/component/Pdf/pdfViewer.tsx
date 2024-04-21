import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logo from './GGAP.jpg';
import { logoImage } from './logo';
import { ChecklistDataDef } from '../../models';
import { useTranslations } from 'next-intl';

type StatisticsResponseDef = {
  key: string;
  type: string;
  yes: number;
  no: number;
  na: number;
  percent: number;
}

interface PdfDataDef {
  statistics?: StatisticsResponseDef[],
  checklistDetail?: ChecklistDataDef,
  header: SummaryHeaderPdfDef,
  checklistName: string,
  infomation: string[]
}

type SummaryHeaderPdfDef = {
  type: string;
  yes: string;
  no: string;
  na: string;
  percent: string;
}
const Quixote: React.FC<PdfDataDef> = ({
    statistics,
    checklistDetail,
    header,
    checklistName,
    infomation
  }: PdfDataDef ) => {
  // Component for header
  const MyHeader = () => (
    <View style={styles.header} fixed>
      <View style={styles.separator}>
        <Image style={{width: '35px'}} src={logoImage}/>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{checklistName}</Text>
        <View style={{fontSize: 14, flexDirection:'column'}}>
          <Text>{infomation[0]}</Text>
          <Text>{infomation[1]}</Text>
        </View>
      </View>
    </View>
  );

  // Component for footer
  const MyFooter = () => (
    <View style={styles.footer} fixed>
      <Text>AgriFarm - 2024</Text>
      <Text render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} />
    </View>
  );
  return (
    <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* Header */}
      <MyHeader />

      {/* Content */}
      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green', textAlign: 'left'}}>Summary</Text>
      <View style={{border: 1, color: '#000'}}>
        <View style={styles.summaryTable}>
          <Text style={styles.summaryTableHeader}>{header.type}</Text>
          <Text style={{...styles.summaryTableHeader, width: '70px'}}>{header.yes}</Text>
          <Text style={{...styles.summaryTableHeader, width: '70px'}}>{header.no}</Text>
          <Text style={{...styles.summaryTableHeader, width: '70px'}}>{header.na}</Text>
          <Text style={styles.summaryTableHeader}>{header.percent}</Text>
        </View>
        <View style={styles.summaryTable}>
          <Text style={styles.summaryTableBody}>{statistics ? statistics[0].type : "Major must"}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[0].yes : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[0].no : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[0].na : 0}</Text>
          <Text style={styles.summaryTableBody}>{statistics ? `${statistics[0].percent}%` : '0%'}</Text>
        </View>
        <View style={styles.summaryTable}>
          <Text style={styles.summaryTableBody}>{statistics ? statistics[1].type : "Minor must"}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[1].yes : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[1].no : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[1].na : 0}</Text>
          <Text style={styles.summaryTableBody}>{statistics ? `${statistics[1].percent}%` : '0%'}</Text>
        </View>
        <View style={styles.summaryTable}>
          <Text style={styles.summaryTableBody}>{statistics ? statistics[2].type : "Recommendation"}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[2].yes : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[2].no : 0}</Text>
          <Text style={{...styles.summaryTableBody, width: '70px'}}>{statistics ? statistics[2].na : 0}</Text>
          <Text style={styles.summaryTableBody}>{statistics ? `${statistics[2].percent}%` : '0%'}</Text>
        </View>
      </View>
      <View style={{fontSize: 11}}break>
        {checklistDetail && (
          <>
            {checklistDetail?.checklistItems.map((item: any, index: number) => {
              if(!item.isResponse) {
                return (
                  <View key={index} style={{flexDirection: 'row',backgroundColor: '#DBEFDC',border: '1.5px solid #cccccc', borderRadius: '3px', marginBottom: '5px'}}>
                    <Text style={{width:'70px', fontWeight: 'bold', margin: '5px'}}>{item.afNum ?? "AF"}</Text>
                    <View key={index} style={{flexDirection: 'column'}}>
                      <Text style={{width:'420px'}}>{item.title}</Text>
                      <Text style={{width:'420px'}}>{item.content}</Text>
                    </View>
                  </View>
                );
              } else {
                let level = "";
                if (item.levelRoute.split(",")[0] == "1") {
                  level = statistics ? statistics[0].type : "Major must"
                } else if (item.levelRoute.split(",")[0] == "2") {
                  level = statistics ? statistics[1].type : "Minor must"
                } else if (item.levelRoute.split(",")[0] == "3") {
                  level = statistics ? statistics[2].type : "Recommendation"
                }
                let result = "";
                if (item.checklistItemResponses.length == 0) {
                  result = header.na
                } else {
                  if (item.checklistItemResponses[0].result == 1) {
                    result = header.yes
                  } else if (item.checklistItemResponses[0].result == 2) {
                    result = header.no
                  } else if (item.checklistItemResponses[0].result == 3) {
                    result = header.na
                  }
                }
                return (
                  <View key={index} style={{flexDirection: 'row',justifyContent: 'space-between', border: '1.5px solid #cccccc', borderRadius: '3px', marginBottom: '5px'}}>
                    <View key={index} style={{width:'80px', fontWeight: 'bold', margin: '5px', flexDirection: 'column'}}>
                      <Text>{item.afNum ?? "AF"}</Text>
                      <Text>{level}</Text>
                    </View>
                    <View key={index} style={{flexDirection: 'column'}}>
                      <Text style={{width:'320px'}}>{item.title}</Text>
                      <Text style={{width:'320px'}}>{item.content}</Text>
                    </View>
                    <View key={index} style={{flexDirection: 'column', marginTop: '10px'}}>
                      <Text style={{borderBottomWidth: 1,borderBottomColor: '#ccc', marginRight: '2px'}}>{result}</Text>
                      <Text style={{width:'100px'}}>{item.checklistItemResponses[0].note}</Text>
                    </View>
                  </View>
                );
              }
            })}
          </>
        )}
      </View>

      {/* Footer */}
      <MyFooter />
    </Page>
  </Document>
  );
}

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf'
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
      fontWeight: 'bold',
    },
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'Roboto'
  },
  header: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12
  },
  block: {
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    padding: 10
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
  },
  separator: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryTable: {
    flexDirection: 'row'
  },
  summaryTableHeader: {
    width: 130,
    fontWeight: 'bold',
    fontSize: 14
  },
  summaryTableBody: {
    width: 130,
    fontSize: 12
  }
});

export default Quixote;
