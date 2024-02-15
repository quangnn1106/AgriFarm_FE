import { Button, Form, Input } from "antd";
import { useTranslations } from 'next-intl';
import styles from '../../../disease.module.scss';
import classNames from 'classnames/bind';
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "./editor.custom.css";
import diseaseInfoEdit from "@/services/Disease/diseaseInfoEdit";

interface DiseaseInfo {
    id: string;
    diseaseName: string;
    symptoms: string;
    cause: string;
    preventiveMeasures: string;
    suggest: string;
}

const DiseaseInfoForm = () => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const [diseaseName, setDiseaseName] = useState("");
    const [editorDataSymptoms, setEditorDataSymptoms] = useState<string>("");
    const [editorDataCause, setEditorDataCause] = useState<string>("");
    const [editorDataPreventiveMeasures, setEditorDataPreventiveMeasures] = useState<string>("");
    const [editorDataSuggest, setEditorDataSuggest] = useState<string>("");
    const [loadings, setLoadings] = useState<boolean>(false);
    
    const handleOnchangeDiseaseName = (e : any) => {
        setDiseaseName(e.target.value);
    }
    const handleOnchangeSymptoms = (event : any , editor : any) => {
      setEditorDataSymptoms(editor.getData());
    }
    const handleOnchangeCause = (event : any , editor : any) => {
        setEditorDataCause(editor.getData());
    }
    const handleOnchangePreventiveMeasures = (event : any , editor : any) => {
        setEditorDataPreventiveMeasures(editor.getData());
    }
    const handleOnchangeSuggest = (event : any , editor : any) => {
        setEditorDataSuggest(editor.getData());
    }
    const saveAction = async () => {
        if (diseaseName == "") {
            return;
        }
        try {
            console.log("Save action .....");
            setLoadings(true);
            const dataEdit : DiseaseInfo = {
                id: "332f4d00-cccd-442b-8e21-3d5974e35588",
                diseaseName: diseaseName,
                symptoms: editorDataSymptoms,
                cause: editorDataCause,
                preventiveMeasures: editorDataPreventiveMeasures,
                suggest: editorDataSuggest,
            }
            const res = await diseaseInfoEdit(dataEdit);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadings(false);
        }
    }
    return (
        <Form
            layout="vertical"
        >
            <Form.Item label={t('disease_name')} name="diseaseName" rules={[{ required: true, message: t('msg_disease_name_require') }]}>
                <Input onChange={handleOnchangeDiseaseName}/>
            </Form.Item>

            <Form.Item label={t('disease_symptoms')} name="diseaseSymptoms">
                <CKEditor
                    editor={Editor}
                    onChange={handleOnchangeSymptoms}
                    onBlur={handleOnchangeSymptoms}
                />
            </Form.Item>

            <Form.Item label={t('disease_cause')} name="diseaseCause">
                <CKEditor
                    editor={Editor}
                    onChange={handleOnchangeCause}
                    onBlur={handleOnchangeCause}
                />
            </Form.Item>

            <Form.Item label={t('disease_preventive_measures')} name="diseasePreventiveMeasures">
                <CKEditor
                    editor={Editor}
                    onChange={handleOnchangePreventiveMeasures}
                    onBlur={handleOnchangePreventiveMeasures}
                />
            </Form.Item>

            <Form.Item label={t('disease_suggest')} name="diseaseSuggest">
                <CKEditor
                    editor={Editor}
                    onChange={handleOnchangeSuggest}
                    onBlur={handleOnchangeSuggest}
                />
            </Form.Item>

            <Form.Item label=" ">
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={`${cx('disease__btn')} ${cx('disease__btn--back')}`}
                >   
                {t('back_btn')}
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className={`${cx('disease__btn')} ${cx('disease__btn--save')}`}
                    onClick={saveAction}
                    loading={loadings}
                >   
                {t('save_btn')}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default DiseaseInfoForm;