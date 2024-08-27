import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../ui/dialog";

type LoadingProps = {
  isOpen: boolean;
};

export default function Loading({ isOpen }: LoadingProps) {
  return (
    <Dialog open={true}>
      <DialogContent hideCloseButton={isOpen}>
        <DialogTitle>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-lime-500"></div>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
