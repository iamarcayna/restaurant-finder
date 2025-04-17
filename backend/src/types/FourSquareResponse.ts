export interface FourSquareErrorResponse {
  message: string;
}

export interface FourSquareResponse {
  results: FourSquareResult[];
}

export interface FourSquareResult {
  fsq_id: string;
  description: string;
  hours: FourSquareHours;
  link: string;
  location: FourSquareLocation;
  name: string;
  price: number;
  rating: number;
  tel: string;
  website: string;
}

export interface FourSquareLocation {
  address: string;
  address_extended: string;
  admin_region: string;
  census_block: string;
  country: string;
  cross_street: string;
  dma: string;
  formatted_address: string;
  locality: string;
  neighborhood: string[];
  po_box: string;
  post_town: string;
  postcode: string;
  region: string;
}

export interface FourSquareHours {
  display: string;
  is_local_holiday: boolean;
  open_now: boolean;
  regular: FourSquareRegular[];
}

export interface FourSquareRegular {
  close: string;
  day: number;
  open: string;
}
