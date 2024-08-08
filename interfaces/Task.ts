import Tag from "./Tag";

export default interface Task {
  id: number;
  title: string;
  description?: string;
  tags: Tag[]
}
