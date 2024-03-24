'use client'
import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import styles from '../disease.module.scss';
import SearchConditionForm from './component/SearchCondition/searchConditionForm';
import { Button, Flex } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import TableComponent from './component/Table/table';
import { diseaseModel } from './model/disease-model';
import fetchDiseaseDataForExport from '@/services/Disease/exportDiseaseDiagnosesApi';
import fetchDiseaseData from '@/services/Disease/diseaseDiagnosesApi';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UseAxiosAuth from '@/utils/axiosClient';
import { AxiosInstance } from 'axios';

const cx = classNames.bind(styles);
const DiseaseDiagnostic = () => {
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [apiData, setApiData] = useState<diseaseModel[]>([]);
    const t = useTranslations('Disease');
    const router = useRouter();
    const http = UseAxiosAuth();

    useEffect(() => {
        const getData = async (http: AxiosInstance | null) => {
            try {
                setLoading(true);
                const responseData = await fetchDiseaseData(http,"","","");
                setApiData(responseData);
            } catch (error: unknown) {
                // Assert the type of error to be an instance of Error
                if (error instanceof Error) {
                    throw new Error(`Error calling API: ${error.message}`);
                } else {
                    throw new Error(`Unknown error occurred: ${error}`);
                }
            } finally {
                setLoading(false);
            }
        };
        getData(http);
    },[http]);

    const searchAction = async () => {
        try {
            setLoading(true);
            const responseData = await fetchDiseaseData(http, keyword, dateFrom, dateTo);
            setApiData(responseData);
        } catch (error: unknown) {
            // Assert the type of error to be an instance of Error
            if (error instanceof Error) {
                throw new Error(`Error calling API: ${error.message}`);
            } else {
                throw new Error(`Unknown error occurred: ${error}`);
            }
        } finally {
            setLoading(false);
        }
    };
    const exportExcel = async () => {
        try {
            const responseData = await fetchDiseaseDataForExport(http, keyword, dateFrom, dateTo);
            const binaryString = window.atob(responseData.data);
            const uint8Array = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            // Tạo và kích hoạt liên kết tải về
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "Diagnostic.xlsx";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // Thực hiện các hành động với dữ liệu từ API
            console.log('API Response:', responseData);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };
    const handleDiagnoses = () => {
        router.push("/diagnostic-add");
    }
    const handleKeyword = (e : any) => {
        setKeyword(e.target.value);
    };
    const handleDate = (dates: any, dateStrings: any)  => {
        setDateFrom(dateStrings[0]);
        setDateTo(dateStrings[1]);
    };
    return (
    <Content style={{ padding: '30px 48px' }}>
        <h1 className={cx('disease__title')}>{t('diagnostic')}</h1>
        {/* Search condition */}
        <ColoredLine text={t('search_condition')}/> 
        <div>
            <SearchConditionForm 
                handleDate={handleDate}
                handleKeyword={handleKeyword}
                searchAction={searchAction}
            />
        </div>
        {/* Search result */}
        <ColoredLine text={t('search_result')}/>
        <Flex gap="small" wrap="wrap">
            <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />} 
                size='large'
                className={cx('disease__btn')}
                onClick={handleDiagnoses}
            >
                {t('add_diagnosis')}
            </Button>
            <Button
                type='primary'
                htmlType='submit'
                size='large'
                icon= {<ExportOutlined />}
                className={cx('disease__btn')}
                disabled = {apiData.length == 0}
                onClick={exportExcel}
            >
                {t('export_excel')}
            </Button>
        </Flex>
        <TableComponent data={apiData} loading={loading} />
    </Content>
    );
};
interface ColoredLineProps {
    text: string;
}
const ColoredLine: React.FC<ColoredLineProps> = ({ text }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={cx('disease__line')} style={{flex: 1}}/>
        <span style={{ marginLeft: 5, marginRight: 5}}>{text}</span>
        <div className={cx('disease__line')} style={{flex: 12}}/>
    </div>
);
export default DiseaseDiagnostic;
