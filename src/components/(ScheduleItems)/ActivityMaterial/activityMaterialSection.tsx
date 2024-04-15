import {
  BorderInnerOutlined,
  CloseOutlined,
  CloseSquareTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  FileSearchOutlined,
  PlusOutlined,
  SearchOutlined,
  SwapOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Descriptions,
  Divider,
  Flex,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import ActivityMaterialFinderModal from './activityMaterialFinderModal';
import { ActivityMaterial } from '@/services/Admin/Activities/Payload/response/activityResponse';
import {
  removeMaterialService,
  setMaterialService
} from '@/services/Admin/Activities/activitySubService';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import UseAxiosAuth from '@/utils/axiosClient';
import { getUnitList } from '../converter/materialUnitList';

interface IProps {
  activityId: string;
  details: ActivityMaterial[] | [];
  editable: boolean;
}

export default function ActivityMaterialSection(props: IProps) {
  const { activityId, details, editable } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [materials, setMaterials] = useState<ActivityMaterial[]>(details ?? []);
  const searchParams = useSearchParams();
  const farmRouter = useRouter();
  const http = UseAxiosAuth();
  const [selectedMaterial, setSelectedMaterial] = useState<ActivityMaterial | null>(null);
  const fakeList: ActivityMaterial[] = Array.from({ length: 10 }, (_, i) => ({
    id: `I${i * 3}_D${i * 2}`,
    name: 'Item ' + i,
    type: 'equipment'
  }));

  const [addOpen, setAddOpen] = useState(false);
  // const [material, setMaterial] = useState(fakeList);

  const handleDelete = async (data: ActivityMaterial) => {
    setIsLoading(true);
    if (selectedMaterial) {
      try {
        const res = await removeMaterialService(http, activityId, selectedMaterial.id);
        if (res) {
          const list = materials.filter((e, index) => e.id !== selectedMaterial.id);
          console.log('handle delete: ', list);
          setMaterials(list);
        } else throw new Error();
      } catch {
        message.error('Something went wrong. Try again!');
      } finally {
        setIsLoading(false);
        setSelectedMaterial(null);
        setConfirmOpen(false);
      }
    }
  };

  const handleAdd = async (data: ActivityMaterial) => {
    setIsLoading(true);
    try {
      const payload = {};
      const res = await setMaterialService(http, activityId, {
        ...data,
        useValue: data.useVal as number,
        unit: data.unit as string
      });
      if (res) {
        const newList = [...materials, data];
        newList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setMaterials(newList);
      } else throw new Error();
    } catch {
      message.error('Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
    }
    await setAddOpen(false);
  };

  const handleSearch = () => {
    //console.log('Searching..');
    setAddOpen(true);
  };

  const handleOption = () => {
    console.log('Searching..');
  };

  useEffect(() => {}, []);

  const headerSection = (
    <Flex
      vertical
      style={{
        paddingInline: 20,
        paddingBlock: 10
      }}
    >
      <Row>
        <Col
          offset={2}
          span={10}
        >
          <Descriptions title={'Vật phẩm sử dụng'} />
        </Col>
        <Col span={8}></Col>
        <Col span={2}>
          {editable && (
            <Popover
              placement='top'
              content={
                <div
                  style={{
                    height: 10,
                    maxWidth: 120,
                    fontSize: 10
                  }}
                >
                  {/* Click to find and add more */}
                  Nhấn để tìm
                </div>
              }
              arrow={false}
            >
              <Button
                type='primary'
                onClick={() => handleSearch()}
              >
                <FileSearchOutlined />
              </Button>
            </Popover>
          )}
        </Col>
        <Col span={2}>
          {/* <Popover
            placement='top'
            content={
              <div
                style={{
                  height: 10,
                  maxWidth: 80,
                  fontSize: 10
                }}
              >
                More action
              </div>
            }
            arrow={false}
          >
            <Button
              //type='primary'
              onClick={() => handleOption()}
            >
              <UnorderedListOutlined />
            </Button>
          </Popover> */}
        </Col>
      </Row>
    </Flex>
  );

  const deleteConfirmPopup = (data: ActivityMaterial) => (
    <Modal
      centered
      okType={'danger'}
      okText={'Xác nhận'}
      okButtonProps={{ type: 'primary' }}
      cancelText={'Hủy bỏ'}
      open={true}
      onCancel={() => {
        setConfirmOpen(false);
        setSelectedMaterial(null);
      }}
      onOk={() => handleDelete(data)}
      title={`Bạn có muốn gỡ vật phẩm ` + data.name}
    ></Modal>
  );

  const columns: TableProps<ActivityMaterial>['columns'] = [
    {
      title: 'Vật phẩm',
      dataIndex: 'Item',
      key: 'name',
      width: '45%',
      render: (_, record) => (
        <Flex
          justify='space-around'
          align='center'
        >
          <Col span={5}>
            <Avatar
              shape='square'
              size={50}
            />
          </Col>
          <Col span={12}>
            <Typography.Text>{record.name}</Typography.Text>
          </Col>
        </Flex>
      )
    },

    {
      title: 'Số lượng sử dụng',
      key: 'duration',
      dataIndex: 'duration',
      render: (_, record) => (
        <>
          <Flex>
            <Col
              offset={2}
              span={9}
            >
              <Input
                type='number'
                value={record.useVal ?? 0}
                // onChange={e => {
                //   setUseVal(Number(e.target.value));
                // }}
                disabled
                style={{ width: '100%' }}
                defaultValue={0}
              />
            </Col>
            <Col
              offset={1}
              span={7}
            >
              <Select
                options={getUnitList(record.type).map(e => ({
                  value: e,
                  label: e
                }))}
                disabled
                value={record.unit}
                // onSelect={e => {
                //   setUseUnit(e);
                // }}
                style={{ width: '100%' }}
                //defaultValue={getUnitList(selectedItem.type)[0]}
                placeholder={'unit'}
              />
            </Col>
          </Flex>
        </>
      )
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Flex justify='center'>
          {editable && (
            <Button
              danger
              shape='circle'
              style={{ cursor: 'pointer' }}
              type='primary'
              onClick={() => {
                setSelectedMaterial(record);
                setConfirmOpen(true);
              }}
            >
              <CloseOutlined />
            </Button>
          )}
        </Flex>
      )
    }
  ];

  const itemsSection = (
    <Flex
      style={{
        width: '100%',
        minWidth: 700,
        minHeight: 300,
        height: '100%'
      }}
      vertical
      align='center'
    >
      {/* <Descriptions title='Your chosen materials' /> */}
      <Flex
        style={{
          //marginInline: 20,
          width: '100%',
          height: '100%',
          //overflow: 'auto',
          border: '1px solid black',
          borderRadius: 10,
          padding: 20
        }}
        vertical
      >
        <Table
          style={{
            width: '100%',
            height: '100%',
            //overflow: 'auto',
            padding: 10
          }}
          rowKey={'name'}
          scroll={{ y: 200 }}
          columns={columns}
          pagination={false}
          bordered
          dataSource={
            materials
            //fakeList
          }
        ></Table>
      </Flex>
    </Flex>
  );

  return (
    <>
      <Flex
        vertical
        align='center'
        // justify=''
        style={{
          width: '100%',
          height: '100%',
          minHeight: 200,
          maxHeight: 400
        }}
      >
        {headerSection}
        {itemsSection}
        {/* Material Content */}
        {confirmOpen && selectedMaterial && deleteConfirmPopup(selectedMaterial)}
        {addOpen && (
          <ActivityMaterialFinderModal
            onClose={() => setAddOpen(false)}
            onSelected={data => handleAdd(data)}
          />
        )}
      </Flex>
    </>
  );
}
