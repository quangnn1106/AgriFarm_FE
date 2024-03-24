import HttpResponseCommon from '@/types/response';
import { GetProp, UploadFile, UploadProps } from 'antd';
import { AxiosInstance } from 'axios';

const basePath = 'media/files';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const uploadFileService: (
  http: AxiosInstance | null,
  item: UploadFile,
  prefix?: string | null
) => Promise<HttpResponseCommon<string | null>> = async (http, item, prefix) => {
    const formData = new FormData();
    formData.append("file", item as FileType);
  const res = await http?.post(`${basePath}/upload${!!prefix && prefix.length>0?"?prefix="+prefix:""}`,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};
