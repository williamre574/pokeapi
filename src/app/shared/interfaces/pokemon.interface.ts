export interface Pokemon {
  name: string;
  url: string;
  id: number;
  checked: boolean;
  stats: StatElement[];
  types: Type[];
  image: string;
  sprites?: any;
}

export interface StatElement {
  base_stat: number;
  effort: number;
  stat: TypeClass;
}

export interface TypeClass {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: TypeClass;
}

export interface Result {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}
