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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled: boolean;
};

function InputBox({
  name,
  type,
  placeholder,
  size,
  icon,
  onChange,
  value,
  disabled,
}: InputBoxProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const inputType = type === "password" && isVisible ? "text" : type;

  return (
    <Input
      startContent={<span>{icon}</span>}
      className="w-full max-w-[20rem] font-SourceCodePro disabled:cursor-not-allowed"
      name={name}
      type={inputType}
      size={size}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      isDisabled={disabled}
      disableAnimation={true}
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
