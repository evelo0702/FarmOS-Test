export interface PowerConsumption {
  date: string;
  dgname: "fuel" | "general" | "heater" | "nutsys" | "storage";
  nvalue: number;
}

export interface Filters {
  month: string[];
  year: string[];
}

export interface GroupedPowerData {
  date: string;
  fuel?: number;
  general?: number;
  heater?: number;
  nutsys?: number;
  storage?: number;
}
