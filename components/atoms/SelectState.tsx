import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "@/interfaces/State";

type SelectStateProps = {
  status: TaskStatus;
  onStatusChange: (newStatus: TaskStatus) => void;
};

export function SelectState({ status, onStatusChange }: SelectStateProps) {
  const [actualStatus, setActualStatus] = React.useState(status);

  const handleStatusChange = (newStatus: TaskStatus) => {
    setActualStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <Select value={actualStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-1/2 min-w-min">
        <SelectValue placeholder={actualStatus} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>State</SelectLabel>
          <SelectItem value="BACKLOG">TODO</SelectItem>
          <SelectItem value="IN_PROGRESS">DOING</SelectItem>
          <SelectItem value="COMPLETED">DONE</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
