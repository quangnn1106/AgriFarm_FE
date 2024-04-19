'use client'
import { Breadcrumb, Button, Card, Cascader, ConfigProvider, Divider, Flex, Table, TableColumnsType, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from '../../adminStyle.module.scss';
import checklistStyle from '../checklistStyle.module.scss';
import classNames from 'classnames/bind';
import {
  HomeOutlined,
  PlusOutlined,
  DownOutlined,
  LinkOutlined
} from '@ant-design/icons';

type CheckListSummaryDto = {
    id: string | undefined;
    type: string | undefined;
    yesNu: number | undefined;
    noNu: number | undefined;
    NAndA: number | undefined;
    notAns: number | undefined;
    compliance: number | undefined;
}

interface Option {
    value: string | number;
    label: string;
}

const CheckListSummary = () => {
  const cx = classNames.bind(styles);
  const pageStyle = classNames.bind(checklistStyle);

  const summaryChecklistTableColumns: TableColumnsType<CheckListSummaryDto> = [
        {
            title: 'Type',
            dataIndex: 'type',
            width: 'max-content',
            fixed: 'left'
        },
        {
            title: 'Yes',
            dataIndex: 'yesNu',
            width: 'max-content',
        },
        {
            title: 'No',
            dataIndex: 'noNu',
            width: 'max-content',
        
        },
        {
            title: 'N/A',
            dataIndex: 'NandA',
            width: 'max-content',

        },
        {
            title: 'Not Answer',
            dataIndex: 'notAns',
            width: 'max-content',
        },
        {
            title: '%Compliance',
            dataIndex: 'compliance',
            render: (_,item) => `${item.compliance}%`,
            width: 'max-content',
        }
    ]
  const options: Option[] = [
    {
      value: 'New',
      label: 'New'
    },
    {
      value: 'Progressing',
      label: 'Progressing'
    },
    {
      value: 'Done',
      label: 'Done'
    }
  ];

  const onChangeCas = (value: (string | number)[]) => {
    console.log(value);
  };
  const data : CheckListSummaryDto[] = [];
    data.push({
        id: "id1",
        type: "Major Must",
        yesNu: 2,
        noNu: 4,
        NAndA: 3,
        notAns:5,
        compliance:4.5
    });
    data.push({
        id: "id2",
        type: "Minor Must",
        yesNu: 2,
        noNu: 4,
        NAndA: 3,
        notAns:5,
        compliance:4.5
    })
    data.push({
        id: "id3",
        type: "Recommendation",
        yesNu: 2,
        noNu: 4,
        NAndA: 3,
        notAns:5,
        compliance:4.5
    })
  
//   id: string | undefined;
//     type: string | undefined;
//     yesNu: number | undefined;
//     noNu: number | undefined;
//     NAndA: number | undefined;
//     notAns: number | undefined;
//     compliance: number | undefined;

  return (
    <>
      <Content style={{ padding: '20px 24px' }}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 24,
                fontWeight: 700,
                groupBorderColor: 'transparent',
                onlyIconSizeLG: 24,
                paddingBlockLG: 0,
                defaultBorderColor: 'transparent',
                defaultBg: 'transparent',
                defaultShadow: 'none',
                primaryShadow: 'none',
                linkHoverBg: 'transparent',
                paddingInlineLG: 0,
                defaultGhostBorderColor: 'transparent'
              }
            }
          }}
        >
          {' '}
          <Button
            className={cx('home-btn')}
            href='#'
            size={'large'}
          >
            <HomeOutlined />
            Farm Name
          </Button>
        </ConfigProvider>
        <Breadcrumb style={{ margin: '0px 24px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>GlobalG.A.P Check list</Breadcrumb.Item>
        </Breadcrumb>

        <label className={cx('title-header')}> GlobalG.A.P Check list </label>
        <div className={pageStyle('checklist-info-header')}>
          <span className={cx('h2-info')}>IFA V4.2</span>
          <span>GGN: 739399274931847</span>
          <Tag color='#4CAF4F'>Site Name</Tag>
        </div>
        <Divider
          plain
          style={{ margin: '12px 0px 20px 0px' }}
        />

        <Flex
          align='center'
          justify='start'
          gap='0.5rem'
        >
          <label>Assessment status: </label>
          <Cascader
            options={options}
            onChange={onChangeCas}
            placeholder='Please select'
          />
          <Button
            className={cx('bg-btn')}
            style={{ marginLeft: 'auto' }}
          >
            Export PDF
          </Button>
        </Flex>

        <h2>INTEGRATED FARM ASSURANCE</h2>
        <Flex align='start' gap={4}>
        <Card
          title='Product A'
          style={{ width: 300 }}
        >
          <p>Major: 1.1%</p>
          <p>Minor: 0.0%</p>
          <p>Recommendation: 0.0%</p>
        </Card>
        <Table dataSource={data} columns={summaryChecklistTableColumns}></Table>
        </Flex>
      </Content>
    </>
  );
};
export default CheckListSummary;