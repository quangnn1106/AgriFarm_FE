import axios from 'axios';

export const DOMAIN = `${process.env.NEXT_PUBLIC_API}`;

export const ACCESS_TOKEN: string = 'accessToken';
export const REFRESH_TOKEN: string = 'refreshToken';

export const USER_LOGIN: string = 'userLogin';

export const http = axios.create({
  baseURL: DOMAIN,
  headers: {
    'content-type': 'application/json'
  },
  timeout: 10000
});
//Cấu hình cho tất cả request gửi đi
// http.interceptors.request

http.interceptors.request.use(
  async config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//Cấu hình cho tất cả kết quả trả về (cấu hình cho response)
http.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  error => {
    //Hàm cấu hình cho tất cả lỗi nhận về
    if (
      error.response?.status === 400 ||
      error.response?.status === 404 ||
      error.response?.status === 500
    ) {
      //Chuyển hướng trang về trang chủ
      console.log(error?.response);

      console.log('Status 400 during HTTP request.');
      return Promise.resolve(error.response);
      //  alert('lỗi kh tìm thấy api hoặc bad request: ');
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      //Chuyển hướng trang về trang login
      //  alert('lỗi kh co quyen call api');

      console.log(error.response.message);
    }

    return Promise.reject(error);
  }
);

/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/
