'use client';

import {
  Breadcrumb,
  Button,
  Cascader,
  Checkbox,
  CheckboxProps,
  Collapse,
  CollapseProps,
  ConfigProvider,
  Divider,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Radio,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  message,
  theme
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  PlusOutlined,
  DownOutlined,
  LinkOutlined
} from '@ant-design/icons';
import styles from '../../adminStyle.module.scss';
import checklistStyle from '../checklistStyle.module.scss';
import classNames from 'classnames/bind';
import { Children, useState } from 'react';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import {
  ControlPoint,
  ControlPointGroup,
  ControlPointGroupObj
} from '../models/control-point-model';
import TextArea from 'antd/es/input/TextArea';

const CheckListDetails = () => {
  const cx = classNames.bind(styles);
  const pageStyle = classNames.bind(checklistStyle);

  interface Option {
    value: string | number;
    label: string;
  }

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

  //Checkbox filter
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['Yes', 'No', 'N/A', 'Pending'];
  const defaultCheckedList = ['N/A'];

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChangeCheckbox = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  //Checklist

  const controlPoints: ControlPointGroup[] = [];
  for (let i = 0; i < 1; i++) {
    controlPoints?.push({
      id: 'cpid' + (i + 1),
      code: 'AF 1',
      name: 'LỊCH SỬ TRANG WEB VÀ QUẢN LÝ TRANG WEB',
      description:
        'Một trong những đặc điểm chính của canh tác bền vững là sự tích ' +
        'hợp liên tục kiến thức cụ thể về địa điểm và kinh nghiệm thực tế vào kế hoạch' +
        ' và thực tiễn quản lý trong tương lai. Phần này nhằm đảm bảo rằng đất đai, nhà' +
        ' cửa và các cơ sở khác cấu thành nên cơ cấu của trang trại, được quản lý phù hợp' +
        ' để đảm bảo sản xuất thực phẩm an toàn và bảo vệ môi trường.',
      controlPointObjs: [
        {
          id: 'cpid' + (i + 1),
          code: 'AF 1.1',
          name: 'Lịch sử trang web',
          description: '',
          controlPoints: [
            {
              id: 'cpitid' + (i + 1),
              code: 'AF 1.1.1',
              description:
                'Có hệ thống tham chiếu cho từng cánh đồng, vườn cây ăn quả, nhà' +
                ' kính, sân vườn, lô đất, chuồng/chuồng chăn nuôi và/hoặc khu vực/địa điểm khác' +
                ' được sử dụng trong sản xuất không?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 2),
              code: 'AF 1.1.1',
              description:
                'Có hệ thống tham chiếu cho từng cánh đồng, vườn cây ăn quả, nhà' +
                ' kính, sân vườn, lô đất, chuồng/chuồng chăn nuôi và/hoặc khu vực/địa điểm khác' +
                ' được sử dụng trong sản xuất không?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 3),
              code: 'AF 1.1.1',
              description:
                'Có hệ thống tham chiếu cho từng cánh đồng, vườn cây ăn quả, nhà' +
                ' kính, sân vườn, lô đất, chuồng/chuồng chăn nuôi và/hoặc khu vực/địa điểm khác' +
                ' được sử dụng trong sản xuất không?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 4),
              code: 'AF 1.1.1',
              description:
                'Có hệ thống tham chiếu cho từng cánh đồng, vườn cây ăn quả, nhà' +
                ' kính, sân vườn, lô đất, chuồng/chuồng chăn nuôi và/hoặc khu vực/địa điểm khác' +
                ' được sử dụng trong sản xuất không?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            }
          ]
        },
        {
          id: 'cpid' + (i + 1),
          code: 'AF 1.2',
          name: 'Quản lý trang trại',
          description: '',
          controlPoints: [
            {
              id: 'cpitid' + (i + 5),
              code: 'AF 1.2.1',
              description:
                'Có đánh giá rủi ro cho tất cả các địa điểm đã đăng ký chứng nhận' +
                '(bao gồm đất thuê, công trình và thiết bị) không và đánh giá rủi ro này' +
                'có cho thấy địa điểm được đề cập phù hợp cho sản xuất liên quan đến ' +
                'an toàn thực phẩm, môi trường và sức khỏe không? và phúc lợi của động vật ' +
                'trong phạm vi chứng nhận chăn nuôi và nuôi trồng thủy sản nếu áp dụng?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 5),
              code: 'AF 1.2.1',
              description:
                'Có đánh giá rủi ro cho tất cả các địa điểm đã đăng ký chứng nhận' +
                '(bao gồm đất thuê, công trình và thiết bị) không và đánh giá rủi ro này' +
                'có cho thấy địa điểm được đề cập phù hợp cho sản xuất liên quan đến ' +
                'an toàn thực phẩm, môi trường và sức khỏe không? và phúc lợi của động vật ' +
                'trong phạm vi chứng nhận chăn nuôi và nuôi trồng thủy sản nếu áp dụng?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 7),
              code: 'AF 1.2.1',
              description:
                'Có đánh giá rủi ro cho tất cả các địa điểm đã đăng ký chứng nhận' +
                '(bao gồm đất thuê, công trình và thiết bị) không và đánh giá rủi ro này' +
                'có cho thấy địa điểm được đề cập phù hợp cho sản xuất liên quan đến ' +
                'an toàn thực phẩm, môi trường và sức khỏe không? và phúc lợi của động vật ' +
                'trong phạm vi chứng nhận chăn nuôi và nuôi trồng thủy sản nếu áp dụng?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            },
            {
              id: 'cpitid' + (i + 8),
              code: 'AF 1.2.1',
              description:
                'Có đánh giá rủi ro cho tất cả các địa điểm đã đăng ký chứng nhận' +
                '(bao gồm đất thuê, công trình và thiết bị) không và đánh giá rủi ro này' +
                'có cho thấy địa điểm được đề cập phù hợp cho sản xuất liên quan đến ' +
                'an toàn thực phẩm, môi trường và sức khỏe không? và phúc lợi của động vật ' +
                'trong phạm vi chứng nhận chăn nuôi và nuôi trồng thủy sản nếu áp dụng?',
              isAchieve: 'Yes',
              note: '',
              attachment: '',
              level: 'Major Must'
            }
          ]
        }
      ]

      //         id: string | undefined,
      // name: string | undefined,
      // description: string | undefined,
      // controlPoints : ControlPoint[] | undefined

      // id: string | undefined,
      // name: string | undefined,
      // description: string | undefined,
      // isAchieve: string | undefined,
      // note: string | undefined,
      // attachment: string | undefined,
      // level: string | undefined
    });
  }
  const items: CollapseProps['items'] = [
    // {
    //   key: '1',
    //   label: 'This is panel nest panel',
    //   children: <p>{text}</p>,
    // },
  ];
  const itemNestA: CollapseProps['items'] = [];
  const itemNestB: CollapseProps['items'] = [];

  controlPoints.forEach(function (value: ControlPointGroup, index: number) {
    value.controlPointObjs?.forEach(function (
      valueItemA: ControlPointGroupObj,
      indexA: number
    ) {
      valueItemA.controlPoints?.forEach(function (
        valueItemB: ControlPoint,
        indexB: number
      ) {
        itemNestB.push({
          key: indexB + 1,
          label: valueItemB.code,
          children: (
            <Flex align='center'>
              <Flex
                align='center'
                vertical={true}
                style={{ width: '60%' }}
              >
                <Flex
                  align='center'
                  justify='space-between'
                >
                  <span>{valueItemB.code}</span>
                  <span style={{ color: 'red' }}>{valueItemB.level}</span>
                </Flex>
                <p>{valueItemB.description}</p>
              </Flex>
              <Divider type='vertical'></Divider>
              <Flex
                vertical={true}
                align='center'
                gap='4'
              >
                <Button icon={<LinkOutlined />}></Button>
                {/* Update Button to UploadFile */}
                <Radio.Group
                  //onChange={onChange}
                  value={valueItemB.isAchieve}
                >
                  <Radio value={'Yes'}>Yes</Radio>
                  <Radio value={'No'}>No</Radio>
                  <Radio value={'N/A'}>N/A</Radio>
                </Radio.Group>
                <TextArea rows={4} />
              </Flex>
            </Flex>
          )
        });
      });
      itemNestA.push({
        key: indexA,
        label: <Flex gap='8'><span>{valueItemA.name}</span> <span>{valueItemA.description}</span></Flex>,
        children: <Collapse defaultActiveKey="1" items={itemNestB} />
      })
    });
    items.push({
        key: index,
        label: <Flex >
            <span style={{width:'20%'}}>{value.code}</span>
            <Flex vertical={true}>
            <span>{value.name}</span>
            <span>{value.description}</span>
            </Flex>
        </Flex>,
        children: <Collapse defaultActiveKey="1" items={itemNestA} />
    })
  });

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

        <Flex
          align='center'
          justify='end'
          style={{ padding: '20px 0px' }}
        >
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChangeCheckbox}
          />
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </Flex>
        <Collapse items={items} />
      </Content>
    </>
  );
};

export default CheckListDetails;
