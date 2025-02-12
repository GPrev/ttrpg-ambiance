export type StrDict<T> = { [key: string]: T };

export interface KeyedObject {
  key: string | null;
}

export interface NamedObject {
  name: string;
}

export function nameSort(a: NamedObject, b: NamedObject): number {
  return a.name.localeCompare(b.name);
}
