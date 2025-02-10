// 셀렉트 바 인터페이스
export interface SelectProps {
  title: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  checked?: boolean;
}

export interface MapItem {
  ccbaAdmin: string;
  ccbaAsno: string;
  ccbaCncl: string;
  ccbaCpno: string;
  ccbaCtcd: string;
  ccbaCtcdNm: string;
  ccbaKdcd: string;
  ccbaMnm1: string;
  ccbaMnm2: string;
  ccmaName: string;
  ccsiName: string;
  crltsnoNm: string;
  latitude: number;
  longitude: number;
  no: number;
  regDt: Date;
  sn: string;
}

export interface CulturalHeritage {
  ccbaKdcd: string;
  ccbaAsno: string;
  ccbaCtcd: string;
  ccbaCpno: string;
  longitude: number; // `parseFloat()`로 변환 가능
  latitude: number;
  ccmaName: string;
  gcodeName: string;
  bcodeName: string;
  mcodeName: string;
  scodeName: string;
  ccbaQuan: number; // `parseInt()`로 변환 가능
  ccbaAsdt: Date; // `new Date(ccbaAsdt)`로 변환 가능
  ccbaLcad: string;
  ccceName: string;
  ccbaPoss: string;
  ccbaAdmin: string;
  imageUrl: string;
  content: string;
}

export interface RoadItem {
  result_code: number;
  result_msg: string;
  sections:Sections[];
  summary: Sumary;
}
interface Sections {
  bound:Bound;
  guides: Guides[];
  roads: Roads[];
  distance:number;
  duration:number;
}
interface Sumary {
  bound:Bound;
  destination:Destination;
  distance:number;
  duration:number;
  fare:Fare;
  origin:Origin;
  priority:string;
  waypoints?:[]
}
interface Guides {
  distance: number;
  duration: number;
  guidance:string;
  name:string;
  road_index:number;
  type:number;
  x: number;
  y: number;
}
interface Bound {
  max_x: number;
  max_y: number;
  min_x: number;
  min_y: number;
} 
interface Roads {
  distance: number;
  duration: number;
  name:string;
  traffic_speed:number;
  traffic_state:number;
  vertexes:number[]
}
interface Destination {
  correction:string;
  name:string;
  x:number;
  y: number;
}
interface Fare {
  taxi:number;
  toll:number;

}
interface Origin {
  name:string;
  x:number;
  y:number;
}