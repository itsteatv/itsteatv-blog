import { Input } from "@nextui-org/react";
import SearchIcon from "./SearchIcon";

export default function SearchInput() {
  return (
    <Input
      classNames={{
        base: "max-w-full max-w-[15rem] sm:max-w-[20rem] h-10 sm:ml-3",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
    />
  );
}
