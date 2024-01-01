import axios from 'axios';

export const DOMAIN = `${process.env.NEXT_PUBLIC_API}`;

export const ACCESS_TOKEN: string = 'accessToken';
export const REFRESH_TOKEN: string = 'refreshToken';

export const USER_LOGIN: string = 'userLogin';

//Cấu hình các hàm get set storage cũng như cookie

export const settings = {
  setStorageJson: (name: string, data: any): void => {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  setStorage: (name: string, data: string): void => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name: string): any | undefined => {
    if (localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);
      if (typeof dataStore == 'string') {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return; //undefined
  },
  getStore: (name: string): string | null | undefined | boolean | any => {
    if (localStorage.getItem(name)) {
      const data: string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return; //undefined
  },
  setCookieJson: (name: string, value: any, days: number): void => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookieJson: (name: string): any => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  },
  setCookie: (name: string, value: string, days: number): void => {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: (name: string): string | null => {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name: string): void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  clearStorage: (name: string) => {
    localStorage.removeItem(name);
  }
};

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
  config => {
    //Cấu hình tất cả header gửi đi đều có bearer token (token authorization đăng nhập)
    // const token = localStorage.getItem('accessToken');
    const token = settings.getCookie(ACCESS_TOKEN);
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    console.log('have set bearer: ', config);
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
    if (error.response?.status === 400 || error.response?.status === 404) {
      //Chuyển hướng trang về trang chủ
      console.log(error.response.message);

      //  alert('lỗi kh tìm thấy api hoặc bad request: ');
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      //Chuyển hướng trang về trang login
      //  alert('lỗi kh co quyen call api');
      //    window.location.href = 'http://localhost:3000/auth/login';
      // const router = useRouter();
      // router.push('/auth/login');
      console.log(error.response.message);
    }

    return Promise.reject(error);
  }
);

// export const authAxios = () =>{
//   const getAccessToken =
// }

/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/
