export default interface HttpResponseCommon<T> {
  data?: T | [] | undefined;
  status: number;
  message?: string | null;
}
