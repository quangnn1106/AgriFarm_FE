'use client'

import { StaticStaffResponse, statisticStaffsService } from "@/services/Admin/Statistics/statisticServices";
import UseAxiosAuth from "@/utils/axiosClient";
import { useEffect } from "react";
import dayjs from 'dayjs';



export default function ImagePage() {

  const http = UseAxiosAuth()

  const fetchData= async()=>{
    try{

      const data = await statisticStaffsService(http, dayjs("2020-10-10").toDate(), dayjs("2023-12-11").toDate());
      const body = data.data as StaticStaffResponse
      if(body){
        console.log(`Tổng số nhân viên được thêm vào thời gian ${'2020-10-10'} đến ${'2023-12-11'} là`, body.sum)
        console.log( `Chênh lệch so với khoảng thời gian trước là ${body.differenceRate}` )
      }
    }catch(err){
      console.log("Error")
    }

  }

  useEffect(()=>{
    fetchData()

  },[])

  return (
    <>
      static
    </>
  );
}
