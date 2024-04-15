'use client'
import ExpertInfo from '@/components/(TrainingItems)/experts/ExpertDetail/expertInfo';

export default function ExpertInfoPage() {
  return (
    <>
      <ExpertInfo
        expert={{
          id: 'sdasdads-q243-asd412-dasd' + 1,
          fullName: `Expert ${1}`,
          description: 'very good technical',
          expertField: 'Math'
        }}
      />
    </>
  );
}
