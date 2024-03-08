import { Chip, Input } from "@nextui-org/react";
import { useState } from "react";

function Tag({ tag }: { tag: string }, key: number) {
  console.log(tag);

  const [editing, setEditing] = useState(false);
  const [editedTag, setEditedTag] = useState(tag);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(e.target.value);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="flex gap-4">
      {editing ? (
        <Input
          variant="underlined"
          value={editedTag}
          onChange={handleTagChange}
          onBlur={handleSave}
          autoFocus
          size="sm"
        />
      ) : (
        <Chip key={key} onClick={handleEdit} variant="bordered">
          {editedTag}
        </Chip>
      )}
    </div>
  );
}

export default Tag;
