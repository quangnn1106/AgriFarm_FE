import {
  getActivityLocationService,
  getActivityMaterialsService
} from '@/services/Admin/Activities/activitySubService';
import {
  ActivityLocation,
  ActivityMaterial
} from '@/services/Admin/Activities/Payload/response/activityResponse';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { useDebounceSearch } from '@/utils/debounceSearch';
import { getPaginationResponse } from '@/utils/paginationHelper';
import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Input,
  List,
  Modal,
  Select,
  Space,
  Typography
} from 'antd';
import Search from 'antd/es/input/Search';
import list from 'antd/es/list';
import { DefaultOptionType } from 'antd/es/select';
import { useRef, useState } from 'react';
import { getUnitList } from '../converter/materialUnitList';

interface IProps {
  onClose: () => void;
  onSelected: (data: ActivityMaterial) => void;
}

const cateList = [
  {
    title: `${'seed'}`,
    value: 'farm-seeds',
    img: ''
  },
  {
    title: `${'pest'}`,
    value: 'farm-pesticides',
    img: ''
  },
  {
    title: `${'fert'}`,
    value: 'farm-fertilizers',
    img: ''
  },
  {
    title: `${'equip'}`,
    value: 'farm-equipments',
    img: ''
  }
];

export default function ActivityMaterialFinderModal(props: IProps) {
  const { onClose, onSelected } = props;
  const [cate, setCate] = useState<string>('all');
  const [useVal, setUseVal] = useState(0)
  const [useUnit, setUseUnit] = useState('')
  const [units, setUnits] = useState<string[]>([])
  const unitSelRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState<ActivityMaterial | null>(null);
  const [list, setList] = useState<ActivityMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const http = UseAxiosAuth();
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 0,
    TotalCount: 1,
    TotalPages: 1
  });

  const itemOptions = () => {
    const list = [
      {
        label: 'All',
        value: 'all'
      }
    ];
    const cates = cateList.map(e => {
      return { label: e.title, value: e.value };
    });
    return [...list, ...cates];
  };

  const handleSearch = async (val: string, cat: string) => {
    //console.log('key: ', val);
    // console.log('cate: ', cat);
    if (val && val.trim().length > 0) {
      setIsLoading(true);
      const res = await getActivityMaterialsService(http, val, cat);
      console.log('body ', res);
      if (res.status === 200) {
        const body = res.data.data as ActivityMaterial[];
        // console.log('page ', getPaginationResponse(res));
        // console.log('List ', body);
        if (body.length > 0) {
          setPage(getPaginationResponse(res));
          setList([...list, ...body]);
        }
      }

      await setIsLoading(false);
    }
  };
  const [onSearch] = useDebounceSearch(k => handleSearch(k, cate), 1000);

  const handleConfirm = () => {
    const data= {
      ...selectedItem,
      unit: useUnit,
      useVal: useVal
    } as ActivityMaterial
    onSelected(data);
  };

  const headerSection = (
    <Flex
      style={{
        height: '5%',
        width: '100%'
      }}
      align='center'
    >
      <Col span={3}></Col>
      {/* <Col span={3}>
        <Select
          onSelect={e => {
            setCate(e);
            console.log('set ', e);
          }}
          style={{ width: '100%' }}
          defaultValue={'all'}
          value={cate}
          options={itemOptions()}
          onChange={e => {
            console.log('set ', e);
            setCate(e);
          }}
        />
      </Col> */}
      <Col
        offset={1}
        span={16}
      >
        <AutoComplete
          //popupMatchSelectWidth={252}
          style={{ width: '100%' }}
          //options={options}
          //onSelect={onSelect}
          //onSearch={handleSearch}
          //size='large'
        >
          <Input
            placeholder={'Input to search'}
            onChange={e => onSearch(e.target.value)}
            type='text'
          />
        </AutoComplete>
      </Col>
    </Flex>
  );

  const searchSection = (
    <Flex
      style={{
        height: '40vh',
        minHeight: 300,
        width: '100%',
        minWidth: 500,
        border: '1px solid',
        borderRadius: 10
      }}
      vertical
      justify='flex-start'
      align='center'
    >
      <Flex
        //wrap='wrap'
        vertical
        align='center'
        justify='flex-start'
        style={{
          width: '90%',
          height: '80%',
          overflow: 'auto',
          padding: 20,
          margin: 20
        }}
        gap={10}
      >
        {!isLoading &&
          list.length > 0 &&
          list.map((e, i) => {
            return (
              <>
                <Flex
                  key={i}
                  style={{
                    minWidth: 300,
                    width: '80%',
                    height: 100,
                    border: '1px solid',
                    borderRadius: 10,
                    padding: 10
                  }}
                  align='center'
                  justify='space-around'
                >
                  <Col span={4}>
                    <Avatar
                      alt=''
                      shape='square'
                      size={80}
                    />
                  </Col>
                  <Col span={8}>
                    <Typography.Text strong>{e.name}</Typography.Text>
                  </Col>

                  <Button
                    onClick={() => {
                      setUnits(getUnitList(e.type))
                      setUseVal(0)
                      setUseUnit("")
                      setSelectedItem(e);
                    }}
                  >
                    Select
                  </Button>
                </Flex>
              </>
            );
          })}
      </Flex>
    </Flex>
  );

  const previewSection = (
    <Flex
      style={{
        width: '100%',
        height: '30%',
        minHeight: 200
      }}
      vertical
      align='center'
    >
      <Descriptions title='Your chosen materials' />
      <Flex
        align='center'
        justify='center'
        style={{
          width: '100%',
          height: 150,
          overflow: 'auto',
          padding: 10
        }}
        vertical
      >
        {selectedItem && (
          <Flex
            align='center'
            style={{
              width: '100%',
              height: 100
            }}
          >
            <Col
              offset={2}
              span={5}
            >
              <Avatar
                shape='square'
                size={100}
              />
            </Col>
            <Col span={8}>
              <p>{selectedItem.name}</p>
            </Col>
            <Col span={3}>
              <Input
                type='number'
                value={useVal}
                onChange={e => {
                  setUseVal(Number(e.target.value));
                }}
                style={{ width: '100%' }}
                defaultValue={0}
              />
            </Col>
            {selectedItem.type && (
              <Col
                offset={1}
                span={3}
              >
                <Select
                  options={units.map(e => ({
                    value: e,
                    label: e
                  }))}
                  value={useUnit}
                  onSelect={e => {
                    setUseUnit(e);
                  }}
                  style={{ width: '100%' }}
                  //defaultValue={getUnitList(selectedItem.type)[0]}
                  placeholder={'unit'}
                />
              </Col>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );

  return (
    <>
      <Modal
        width={'60vw'}
        style={{ padding: 20, minWidth: 600 }}
        centered
        open={true}
        onCancel={() => onClose()}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type='primary' onClick={()=>handleConfirm()}>{'Confirm'}</Button>
          </>
        )}
      >
        <Flex
          style={{
            width: '100%',
            minHeight: 600
          }}
          vertical
          align='center'
          justify='space-between'
        >
          {headerSection}
          <Divider></Divider>
          {searchSection}
          <Divider></Divider>
          {previewSection}
        </Flex>
      </Modal>
    </>
  );
}

// const x = (
//   <>
//     <Flex
//       //vertical
//       wrap='wrap'
//       gap={20}
//       align='center'
//       style={{
//         //height: '90%',
//         //border: '1px solid black',
//         width: '100%',
//         marginLeft: 50
//       }}
//       justify='flex-start'
//     >
//       {list.length === 0 &&
//         cateList.map((e, i) => {
//           return (
//             <>
//               {/* <Flex> */}
//               <Button
//                 style={{ width: '30%', height: 80, justifyContent: 'center' }}
//                 onClick={() => setCate(e.value)}
//                 key={e.value + i}
//               >
//                 <Space align='baseline'>
//                   <Avatar
//                     src={e.img}
//                     size={60}
//                     shape='square'
//                   />
//                   <Descriptions title={e.title} />
//                 </Space>
//               </Button>
//               {/* </Flex> */}
//             </>
//           );
//         })}
//       <Flex
//         vertical
//         style={{ width: '100%' }}
//         align='center'
//       >
//         <Typography.Text
//           type='secondary'
//           italic
//         >
//           Choose a category
//         </Typography.Text>
//       </Flex>
//     </Flex>
//   </>
// )
