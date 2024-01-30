export default interface HttpResponseCommon<T> {
  data: T;
  status: number;
  message: string;
}
