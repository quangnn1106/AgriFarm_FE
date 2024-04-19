import { Button, Flex, Timeline } from 'antd';
import { useState } from 'react';

interface IProps {
  data: {
    name: string;
    date: string | Date;
  };
}

export default function CultTimeline() {

  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState([
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
  ])

  const handleViewMore=()=>{
    const add = [
      {
        label: '11/04/2018',
        children: 'Thâm canh'
      },
      {
        label: '10/4/2018',
        children: 'Xử lý hóa chất'
      },
      {
        label: '07/03/2018',
        children: 'Thâm canh'
      },
      {
        label: '06/02/2018',
        children: 'Xử lý hóa chất'
      }
    ]
    setList(prev=> [...prev,...add])

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
          items={list}
        />
        {hasMore && <Button onClick={()=>handleViewMore()} block>Xem thêm</Button>}
      </Flex>
    </>
  );
}
