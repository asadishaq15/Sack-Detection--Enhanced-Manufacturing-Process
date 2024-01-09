// Feature type
export type Feature = {
    id: string;
    labels: string[];
    colors: { hex: string; [key: string]: any }[];
  };
  
  // AttributeState type
  export type AttributeState = {
    attributes: Feature[] | null;
  };
  
  // Person type
  export type Person = { box: number[]; labels: string[]; colors: string[] };
  
  // Actions union type
  export type Actions =
    | { type: "changeAttribute"; newAttribute: any }
    | { type: "addWholePerson"; labels: string[]; colors: string[] }
    | { type: "addPerson" }
    | { type: "deletePerson"; pid: string }
    | { type: "addLabel"; pid: string; value: string }
    | { type: "removeLabel"; pid: string; value: string }
    | { type: "addColor"; pid: string; value: { hex: string } }
    | { type: "updateColor"; pid: string; idx: number; value: { hex: string } }
    | { type: "removeColor"; pid: string };
  
  // MetaData type
  export type MetaData = {
    frame_sec: number;
    persons: string;
  };
  