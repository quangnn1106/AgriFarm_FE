import { getActivityHistoryService } from '@/services/Admin/Activities/activityService';
import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import { PaginationResponse } from '@/types/pagination';
import UseAxiosAuth from '@/utils/axiosClient';
import { getPaginationResponse } from '@/utils/paginationHelper';
import { Button, Flex, Timeline } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { Link } from '@/navigation';

interface IProps {
  data: {
    name: string;
    date: string | Date;
  };
}
const fakeData = [
  {
    label: '20/01/2019',
    children: 'Dọn vệ sinh'
  },
  {
    label: '10/12/2018',
    children: 'Thu hoạch'
  },
  {
    label: '25/06/2018',
    children: 'Bón phân'
  },
  {
    label: '20/05/2018',
    children: 'Xới đất'
  }
]

export default function CultTimeline() {

  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<ActivityResponse[]>([])
  const [isFetching, setIsFetching] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [hasChanged, setHasChanged] = useState(true);
  const http = UseAxiosAuth();
  const [page, setPage] = useState<PaginationResponse>({
    CurrentPage: 1,
    PageSize: 5,
    TotalCount: 0,
    TotalPages: 1
  });

  const fetchData = async () => {
    try {
      setIsFetching(true)
      console.log('Fetching data..');
      const responseData = await getActivityHistoryService(
        http,
        page.CurrentPage,
        page.PageSize
      );
      console.log('Data here: ', responseData);
      setPage(getPaginationResponse(responseData));
      const body = responseData?.data.data as ActivityResponse[]
      setList(prev=>[...prev, ...body]);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API: ', error);
    }

  };
  const fetchInitData = async () => {
    try {
      setIsFetching(true)
      console.log('Fetching data..');
      const responseData = await getActivityHistoryService(
        http,
        page.CurrentPage,
        page.PageSize
      );
      console.log('Data here: ', responseData);
      setPage(getPaginationResponse(responseData));
      const body = responseData?.data.data as ActivityResponse[]
      setList(body);
      setIsFetching(false);
    } catch (error) {
      console.error('Error calling API: ', error);
    }

  };

  useEffect(()=>{
    if(initLoading){

      fetchInitData()
    }
    return ()=>{
      setInitLoading(false)
    }
  },[])

  useEffect(()=>{
    if(!initLoading){

      fetchData()
      if(page.CurrentPage === page.TotalPages){
        setHasMore(false)
      }
    }
    
  },[page.CurrentPage])

  const handleViewMore=()=>{
    // const add = [
    //   {
    //     label: '11/04/2018',
    //     children: 'Thâm canh'
    //   },
    //   {
    //     label: '10/4/2018',
    //     children: 'Xử lý hóa chất'
    //   },
    //   {
    //     label: '07/03/2018',
    //     children: 'Thâm canh'
    //   },
    //   {
    //     label: '06/02/2018',
    //     children: 'Xử lý hóa chất'
    //   }
    // ]
    // setList(prev=> [...prev,...add])
    setPage(prev=>({...prev ,CurrentPage: prev.CurrentPage+1}))

  }

  return (
    <>
      <Flex
      vertical
      style={{
        width: '80%',
        minHeight:400
      }}
      >
        <Timeline
          style={{
            width: '100%'
          }}
          mode={'left'}
          items={list.map(e=>({
            key: e.id,
            label: dayjs(e.start).format("DD/MM/YYYY"),
            children: <Link href={'/activities/'+e.id}>{e.title}</Link>
          }))}
        />
        {hasMore && <Button onClick={()=>handleViewMore()} block>Xem thêm</Button>}
      </Flex>
    </>
  );
}
