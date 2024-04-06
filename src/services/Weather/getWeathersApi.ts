
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";
import { DataWeather, Forecast } from "./weather-models";
// import { Weather } from "./weather-models";

const getWeathersApi: (
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<DataWeather>> = async (http) => {
    try {
        const res = await http?.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat: '10.0364216',
                lon: '105',
                lang: 'vi',
                appid: 'b6c169d7ce6b06e7cbb11190ce643a22',
                units: 'metric'
            }
        });
        return res?.data;

    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
// export default getWeathersApi;
// const getWeathersApi = () => {
//     const options = { method: 'GET', headers: {accept: 'application/json'}};
//     fetch('https://api.openweathermap.org/data/2.5/forecast?lat=10.0364216&lon=105.7875219&lang=vi&appid=b6c169d7ce6b06e7cbb11190ce643a22&units=metric',  options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.log(err));
//     return response
// }
export default getWeathersApi;