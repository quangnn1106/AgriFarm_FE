import {
  LandProd,
  SeedPro
} from '@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { CreateProductDto } from '@/services/Admin/Product/postProductApi';

export type LandAndSeedResponse = {
  productGlobal: CreateProductDto[] | null | undefined;
};

// export type payLoadResponse = {
//   land: LandProd | null;
//   seed: SeedPro | null | undefined;
// };

// export type ProductState = {
//   land: LandProd | null;
//   seed: SeedPro | null | undefined;
// };

const initialState: LandAndSeedResponse = {
  productGlobal: [
    {
      land: {},
      seed: {}
    }
  ]
};

const products = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
    setProductsAction: (
      state: LandAndSeedResponse,
      action: PayloadAction<CreateProductDto[] | undefined>
    ) => {
      // state.productGlobal?.push(action.payload);
      state.productGlobal = action.payload;

    }
  }
});

export const { setProductsAction } = products.actions;

export default products.reducer;

/* ---------------- action api async action ----------  */
// export const postProductsSlice = (
//   http: AxiosInstance | null,
//   seasonId?: string | undefined,
//   payLoadRequest?: payLoadResponse
// ) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       const result = await createProductApiSlice(http, seasonId, payLoadRequest);
//       const content = result?.data as payLoadResponse[];

//       //Sau khi lấy dữ liệu từ api về chúng ta sẽ dispatch lên store
//       const action: PayloadAction<payLoadResponse[]> = setProductsAction(content);
//       dispatch(action);
//       console.log('contententetntn ', content);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
