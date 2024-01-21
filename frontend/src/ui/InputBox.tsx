import { Input } from "@nextui-org/react";
import EyeFilledIcon from "./EyeFilledIcon";
import EyeSlashFilledIcon from "./EyeSlashFilledIcon";
import { useState } from "react";

type InputBoxProps = {
  name: string;
  placeholder: string;
  type: string;
  size: "sm" | "md" | "lg";
  icon: React.ReactNode;
};

function InputBox({ name, type, placeholder, size, icon }: InputBoxProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputType = type === "password" && isVisible ? "text" : type;

  return (
    <Input
      startContent={<span>{icon}</span>}
      className="w-full max-w-[20rem] font-SourceCodePro"
      name={name}
      type={inputType}
      size={size}
      placeholder={placeholder}
      endContent={
        type === "password" && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        )
      }
    />
  );
}

export default InputBox;