import React from 'react';
import ResetForm from './resetForm';
import { notFound } from 'next/navigation';


type Props = {};

const PageReset = (props: any) => {
  const id = atob(props.searchParams.id??"");
  console.log('param: ', id);

  if(!id || id.trim().length === 0){
    return notFound()
  }

  return <ResetForm id={id}/>;
};

export default PageReset;
