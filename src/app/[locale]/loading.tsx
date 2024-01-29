import Loader from '@/components/Loader/Loader';

type Props = {};

const loading = (props: Props) => {
  return (
    <>
      <Loader
        fullScreen
        spinning
      />
    </>
  );
};

export default loading;
