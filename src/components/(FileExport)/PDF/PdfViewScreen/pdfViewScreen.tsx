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
import { CultDocument } from '../cultivationPDFDocument';

export default function PdfViewScreen() {
  return (
    <>
      <PDFViewer
        width={1000}
        height={1000}
      >
        <CultDocument data={[]} />
      </PDFViewer>
    </>
  );
}
