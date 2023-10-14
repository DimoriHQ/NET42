import { DB__NET42 } from "../config";

export const createDBCollName = (name: string) => {
  return `${DB__NET42}__${name}`;
};
