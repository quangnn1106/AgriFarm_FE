import { Button, Flex, Timeline } from 'antd';

interface IProps {
  data: {
    name: string;
    date: string | Date;
  };
}

export default function CultTimeline() {
  return (
    <>
      <Flex
      vertical
      style={{
        width: '80%'
      }}
      >
        <Timeline
          style={{
            width: '100%'
          }}
          mode={'left'}
          items={[
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
              label: '20/01/2017',
              children: 'Xới đất'
            }
          ]}
        />
        <Button block>Xem thêm</Button>
      </Flex>
    </>
  );
}
