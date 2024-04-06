
// import HttpResponseCommon from "@/types/response";
// import { AxiosInstance } from "axios";
// import { Weather } from "./weather-models";

// const getWeathersApi: (
//     http?: AxiosInstance | null
//     ) => Promise<HttpResponseCommon<Weather>> = async (http) => {
//     try {
//         const res = await http?.get(`https://api.tomorrow.io/v4/weather/forecast`, {
//             params: {
//                 apikey: 'zuslOk00j58MJR9H6omdaDzCD2ThqIgD',
//                 location: '10.048212, 105.749170'
//             }
//         });
//         return res?.data;

//     } catch (error: unknown) {
//         // Assert the type of error to be an instance of Error
//         if (error instanceof Error) {
//             throw new Error(`Error calling API: ${error.message}`);
//         } else {
//             throw new Error(`Unknown error occurred: ${error}`);
//         }
//     }
// }
// export default getWeathersApi;
const getWeathersApi = () => {
    const options = { method: 'GET', headers: {accept: 'application/json'}};
    fetch('https://api.tomorrow.io/v4/weather/forecast?apikey=zuslOk00j58MJR9H6omdaDzCD2ThqIgD&location=10.048212,+105.749170', options )
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
}
export default getWeathersApi;