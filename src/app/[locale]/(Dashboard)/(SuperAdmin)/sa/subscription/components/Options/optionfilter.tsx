interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
export const options: Option[] = [
  {
    label: 'Địa chỉ',
    value: 'light',
    children: new Array(5)
      .fill(null)
      .map((_, index) => ({ label: `Thành phố ${index + 1}`, value: index }))
  },
  {
    label: 'Email',
    value: 'bamboo',
    children: new Array(5)
      .fill(null)
      .map((_, index) => ({ label: `Email ${index + 1}`, value: index }))
  }
];
