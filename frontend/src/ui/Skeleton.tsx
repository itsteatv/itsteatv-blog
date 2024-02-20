import { Skeleton as NextUISkeleton } from "@nextui-org/react";
export default function Skeleton() {
  return (
    <div className="w-[960px] space-y-5 p-4">
      <NextUISkeleton className="rounded-lg">
        <div className="h-[400px] rounded-lg bg-default-300"></div>
      </NextUISkeleton>
    </div>
  );
}
