"use client"

import { useRouter } from "@/navigation";
import { Button } from "antd";
import { useEffect } from "react";

export default function UseActivityPage(props: any) {
  console.log('This page props: ', props);
  const router = useRouter();
  const handleBack=()=>{
    router.back()
  }

  const fetchData=()=>{
    
  }

  useEffect(()=>{

  },[])

  return (
    <>
      <p>This is use page of activity: {atob(props.params.activityId)}</p>
      <p>and data is: {localStorage.getItem("something")}</p>
      <Button onClick={()=>handleBack()}>Back</Button>
    </>
  );
}
