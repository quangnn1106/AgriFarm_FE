export interface Sites {
  id: string;
  name: string;
  description: string;
  siteCode: string;
  isActive: boolean;
  avatar: null;
  logo: null;
  positions: Position[] | [];
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
}

export interface Position {
  lat: number;
  long: number;
}
