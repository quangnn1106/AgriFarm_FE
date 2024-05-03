export default interface HttpResponseCommon<T> {
  data?: T | [] | T[] | undefined;
  status: number;
  message?: string | null;
}
