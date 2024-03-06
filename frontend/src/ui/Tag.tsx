import { Chip } from "@nextui-org/react";

function Tag({ tag }) {
  return (
    <div className="flex gap-4">
      <Chip onClose={() => console.log("close")}>Chip</Chip>
      <Chip onClose={() => console.log("close")} variant="bordered">
        {tag}
      </Chip>
    </div>
  );
}

export default Tag;
