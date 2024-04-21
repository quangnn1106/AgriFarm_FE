'use client'
import React, { ChangeEvent, ReactElement } from 'react';
import { Form, Input, DatePicker, Button, TablePaginationConfig } from 'antd';
import styles from '../../disease.module.scss';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
interface SearchConditionFormProps {
    handleKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDate: (dates: any, dateStrings: any) => void;
    searchAction: (pagination: TablePaginationConfig) => void;
  }
  const SearchConditionForm: React.FC<SearchConditionFormProps> = ({
    handleKeyword,
    handleDate,
    searchAction
    }: SearchConditionFormProps): ReactElement => {
    const cx = classNames.bind(styles);
    const t = useTranslations('Disease');
    const buttonItemLayout = {
        wrapperCol: { span: 8, offset: 8 },
    };
    return (
        <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        layout="horizontal"
        >
            <Form.Item label={t('search_by_keyword')}>
                <Input
                onChange={handleKeyword}
                placeholder={t('keyword_text_placeholder')}
                />
            </Form.Item>
            <Form.Item label={t('search_by_date')}>
                <RangePicker allowEmpty={[true, true]} placeholder={[t('start_date'),t('end_date')]} onChange={handleDate} />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button
                type="primary"
                htmlType="submit"
                size="large"
                className={cx('disease__searchBtn')}
                onClick={() => {
                    const page: TablePaginationConfig = {
                        pageSize: 10,
                        current: 1
                    }
                    searchAction(page);
                }}
                >
                {t('search_btn')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SearchConditionForm;
