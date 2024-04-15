export interface FarmProductResponse {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  seedRef: {
    id: string;
    name: string;
  };
  img?: string;
}

export interface ProductSeedResponse {
  id: string;
  name: string;
  description: string
  img?: string
}

export interface ProductionResponse {
  product: {
    id: string;
    name: string;
  };
  unit: string;
  output: number;
  season:{
    id: string
    name: string
    startIn: Date
    endIn?: Date
  }
  location:{
    id: string,
    name: string
  }
//   status: number
  productivity?: number;
  harvestDate?: Date|null
}
