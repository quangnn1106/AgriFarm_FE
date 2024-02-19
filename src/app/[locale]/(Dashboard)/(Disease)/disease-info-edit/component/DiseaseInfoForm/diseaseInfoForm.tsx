import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import styles from '../../../disease.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import Editor from "ckeditor5-custom-build/build/ckeditor";
import './editor.custom.css';
import diseaseInfoEdit from '@/services/Disease/diseaseInfoEdit';
import diseaseInfoDetailApi from '@/services/Disease/diseaseInfoDetailApi';
import ModalComponent from '../modal/modal';
import { STATUS_OK } from '@/constants/https';
import Editor from '@/CKEditor5/build/ckeditor';

interface DiseaseInfo {
  id: string;
  diseaseName: string;
  symptoms: string;
  cause: string;
  preventiveMeasures: string;
  suggest: string;
}

const DiseaseInfoForm = () => {
  const router = useRouter();
  const cx = classNames.bind(styles);
  const t = useTranslations('Disease');
  const [diseaseName, setDiseaseName] = useState('');
  const [editorDataSymptoms, setEditorDataSymptoms] = useState<string>('');
  const [editorDataCause, setEditorDataCause] = useState<string>('');
  const [editorDataPreventiveMeasures, setEditorDataPreventiveMeasures] =
    useState<string>('');
  const [editorDataSuggest, setEditorDataSuggest] = useState<string>('');
  const [loadings, setLoadings] = useState<boolean>(false);
  const id = useSearchParams().get('id');
  const [diseaseInfoDeatail, setDiseaseInfoDeatail] = useState<DiseaseInfo | null>(null);
  const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
  const [msgUpdate, setMsgUpdate] = useState('');
  useEffect(() => {
    if (id == null) {
      return;
    }
    getDiseaseInfo(id);
  }, [id]);

  const getDiseaseInfo = async (id: string) => {
    try {
      const responseData = await diseaseInfoDetailApi(id);
      setDiseaseInfoDeatail(responseData.data);
      if (responseData.data != null) {
        setDiseaseName(responseData.data.diseaseName);
        setEditorDataSymptoms(responseData.data.symptoms);
        setEditorDataCause(responseData.data.cause);
        setEditorDataPreventiveMeasures(responseData.data.preventiveMeasures);
        setEditorDataSuggest(responseData.data.suggest);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  const handleOnchangeDiseaseName = (e: any) => {
    setDiseaseName(e.target.value);
  };
  const handleOnchangeSymptoms = (event: any, editor: any) => {
    setEditorDataSymptoms(editor.getData());
  };
  const handleOnchangeCause = (event: any, editor: any) => {
    setEditorDataCause(editor.getData());
  };
  const handleOnchangePreventiveMeasures = (event: any, editor: any) => {
    setEditorDataPreventiveMeasures(editor.getData());
  };
  const handleOnchangeSuggest = (event: any, editor: any) => {
    setEditorDataSuggest(editor.getData());
  };
  const saveAction = async () => {
    if (diseaseName == '') {
      return;
    }
    try {
      console.log('Save action .....');
      setLoadings(true);
      const dataEdit: DiseaseInfo = {
        id: id ?? '',
        diseaseName: diseaseName,
        symptoms: editorDataSymptoms,
        cause: editorDataCause,
        preventiveMeasures: editorDataPreventiveMeasures,
        suggest: editorDataSuggest
      };
      const res = await diseaseInfoEdit(dataEdit);
      if (res.statusCode == STATUS_OK) {
        setMsgUpdate(t('message_update_ok'));
      } else {
        setMsgUpdate(t('message_update_fail'));
      }
    } catch (error) {
      console.log(error);
      setMsgUpdate(t('message_update_fail'));
    } finally {
      setLoadings(false);
      setDisplayModalUpdate(true);
    }
  };
  const handleClose = () => {
    setDisplayModalUpdate(false);
  };
  const backAction = () => {
    console.log('Back action.....');
    router.back();
  };
  return (
    <>
      {diseaseInfoDeatail && (
        <Form layout='vertical'>
          <Form.Item
            initialValue={diseaseInfoDeatail.diseaseName}
            label={t('disease_name')}
            name='diseaseName'
            rules={[{ required: true, message: t('msg_disease_name_require') }]}
          >
            <Input
              onChange={handleOnchangeDiseaseName}
              disabled={loadings}
            />
          </Form.Item>

          <Form.Item
            label={t('disease_symptoms')}
            name='diseaseSymptoms'
          >
            <CKEditor
              editor={Editor}
              onChange={handleOnchangeSymptoms}
              onBlur={handleOnchangeSymptoms}
              data={diseaseInfoDeatail.symptoms}
              disabled={loadings}
            />
          </Form.Item>

          <Form.Item
            label={t('disease_cause')}
            name='diseaseCause'
          >
            <CKEditor
              editor={Editor}
              onChange={handleOnchangeCause}
              onBlur={handleOnchangeCause}
              data={diseaseInfoDeatail.cause}
              disabled={loadings}
            />
          </Form.Item>

          <Form.Item
            label={t('disease_preventive_measures')}
            name='diseasePreventiveMeasures'
          >
            <CKEditor
              editor={Editor}
              onChange={handleOnchangePreventiveMeasures}
              onBlur={handleOnchangePreventiveMeasures}
              data={diseaseInfoDeatail.preventiveMeasures}
              disabled={loadings}
            />
          </Form.Item>

          <Form.Item
            label={t('disease_suggest')}
            name='diseaseSuggest'
          >
            <CKEditor
              editor={Editor}
              onChange={handleOnchangeSuggest}
              onBlur={handleOnchangeSuggest}
              data={diseaseInfoDeatail.suggest}
              disabled={loadings}
            />
          </Form.Item>

          <Form.Item label=' '>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              className={`${cx('disease__btn')} ${cx('disease__btn--back')}`}
              onClick={backAction}
            >
              {t('back_btn')}
            </Button>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              className={`${cx('disease__btn')} ${cx('disease__btn--save')}`}
              onClick={saveAction}
              loading={loadings}
            >
              {t('save_btn')}
            </Button>
          </Form.Item>
        </Form>
      )}
      {displayModalUpdate && msgUpdate && (
        <ModalComponent
          title={t('edit_disease_info')}
          body={msgUpdate}
          open={displayModalUpdate}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default DiseaseInfoForm;
