import { Tag } from "./Tag";

export default interface Task {
  id: number; //se puede cambiar si se trata de un id string
  title: string;
  description?: string;
  tags?: Tag[]
}
