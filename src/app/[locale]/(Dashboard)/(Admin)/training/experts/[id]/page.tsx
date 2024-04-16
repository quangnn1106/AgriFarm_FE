'use client';
import ExpertInfo from '@/components/(TrainingItems)/experts/ExpertDetail/expertInfo';
import { Flex } from 'antd';

export default function ExpertInfoPage() {
  return (
    <>
      <Flex style={{
        marginLeft:'5vw'
      }}>
        <ExpertInfo
          expert={{
            id: 'sdasdads-q243-asd412-dasd' + 1,
            fullName: `Expert ${1}`,
            description: 'very good technical',
            expertField: 'Math'
          }}
        />
      </Flex>
    </>
  );
}
