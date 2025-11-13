export interface FlightData {
     id: string;
     mab_id: string;
     fn: string;
     cs: string;
     aid: string;
     loc: {
          type: string;
          coordinates: Array<number>;
     };
     lat: number;
     lng: number;
     alt: number;
     hd: number;
     spd: number;
     ts: number;
     ft: string;
     flg: string;
     at: string;
     ctc: string;
     dtsrc: string;
     clsrc: string;
     issdt: string;
     udt: string;
}
