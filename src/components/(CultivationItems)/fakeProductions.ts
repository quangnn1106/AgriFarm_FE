import {
  FarmProductResponse,
  ProductionResponse
} from '@/services/Admin/Productions/Payload/response/production.response';
import dayjs from 'dayjs';

export const FakePro: ProductionResponse[] = [
  {
    product: {
      id: '1',
      name: 'Gạo ST25'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Đông xuân',
      startIn: dayjs('2022-12-27').toDate(),
      endIn: dayjs('2023-02-17').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ01'
    },
    output: 1000,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2023-02-17').toDate()
  },
  {
    product: {
      id: '2',
      name: 'Gạo Đài Loan'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Hè thu',
      startIn: dayjs('2023-06-17').toDate(),
      endIn: dayjs('2023-11-17').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ01'
    },
    output: 1000,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2023-02-17').toDate()
  },
  {
    product: {
      id: '3',
      name: 'Gạo Tài Nguyên'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Hè thu',
      startIn: dayjs('2022-06-11').toDate(),
      endIn: dayjs('2022-11-01').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ01'
    },
    output: 1000,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2022-11-01').toDate()
  },
  {
    product: {
      id: '4',
      name: 'Gạo Tài Nguyên'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Đông xuân',
      startIn: dayjs('2020-12-17').toDate(),
      endIn: dayjs('2021-02-17').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ22'
    },
    output: 148,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2023-02-17').toDate()
  },
  {
    product: {
      id: '1',
      name: 'Gạo Tài Nguyên'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Đông xuân',
      startIn: dayjs('2018-12-27').toDate(),
      endIn: dayjs('2019-02-17').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ01'
    },
    output: 1000,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2019-02-17').toDate()
  },
  {
    product: {
      id: '2',
      name: 'Gạo Đài Loan'
    },
    season: {
      id: 'sasdda0-asd-asd-asad-dsads',
      name: 'Hè thu',
      startIn: dayjs('2019-06-17').toDate(),
      endIn: dayjs('2019-11-17').toDate()
    },
    location: {
      id: 'sasdda0-asds-11asd-asad2d',
      name: 'MKZ01'
    },
    output: 1000,
    unit: 'kg',
    productivity: 1000,
    harvestDate: dayjs('2019-11-17').toDate()
  }
];

export const fakeProduct: FarmProductResponse[] = [
  {
    id: '911216af-29de-4acb-b7b3-57c57b2f50be',
    name: 'Gạo Đài Loan',
    quantity: 1000,
    seedRef: {
      id: 'asdis+1',
      name: 'Gạo Đài Loan'
    },
    unit: 'kg',
    img: 'https://gaosachsonghau.com/upload/images/gao-dai-loan.jpg'
  },
  {
    id: '7f211f5f-d585-4bb8-87d9-d46279e0221a',
    name: 'Gạo Tài Nguyên',
    quantity: 1000,
    seedRef: {
      id: 'asdis+1',
      name: 'Gạo Tài Nguyên'
    },
    unit: 'kg',
    img:'https://anbinhphat.com/wp-content/uploads/2018/04/Tai-Nguyen-10kg.jpg'
  },
  {
    id: '2f72be10-7349-4e23-b2b4-6d853296a669',
    name: 'Gạo ST25',
    quantity: 1000,
    seedRef: {
      id: 'asdis+1',
      name: 'Gạo ST25'
    },
    unit: 'kg'
  }
];
