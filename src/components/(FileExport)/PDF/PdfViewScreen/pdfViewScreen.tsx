// import { PDFViewer } from "@react-pdf/renderer";
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);
import dynamic from 'next/dynamic';
import { MyDocument } from '../pdfDraftDoc';

export default function PdfViewScreen() {
  return (
    <>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </>
  );
}
