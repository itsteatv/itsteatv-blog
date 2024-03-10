import { Chip, Input } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "../pages/Editor";

function Tag({ tag }: { tag: string }, key: number) {
  const { blog, setBlog } = useContext(EditorContext);
  const { tags } = blog;

  console.log(tag);

  const [editing, setEditing] = useState(false);
  const [editedTag, setEditedTag] = useState(tag);

  useEffect(() => {
    setEditedTag(tag);
  }, [tag]);

  const handleTagDelete = function () {
    const deletedTag = tags.filter((t) => t !== tag);

    setBlog({ ...blog, tags: deletedTag });

    console.log(deletedTag);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(e.target.value);
  };

  const handleSave = () => {
    if (editedTag.trim() === "") {
      const updatedTags = tags.filter((t) => t !== tag);
      console.log(updatedTags);

      setBlog({ ...blog, tags: updatedTags });
    } else if (tag !== editedTag) {
      const updatedTags = tags.map((t) => (t === tag ? editedTag : t));
      console.log(updatedTags);

      setBlog({ ...blog, tags: updatedTags });
    }

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
      ) : editedTag.trim() !== "" ? (
        <Chip
          key={key}
          onClose={handleTagDelete}
          onClick={handleEdit}
          variant="bordered"
        >
          {editedTag}
        </Chip>
      ) : null}
    </div>
  );
}

export default Tag;
