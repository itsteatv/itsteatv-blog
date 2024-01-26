import { GoPerson } from "react-icons/go";
import { GoMention } from "react-icons/go";
import { GoKey } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import InputBox from "./InputBox";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { emailRegex } from "../utils/regexPatterns";
import { passwordRegex } from "../utils/regexPatterns";
import toast from "react-hot-toast";

type UserAuthFormProps = {
  type: string;
};

function UserAuthForm({ type }: UserAuthFormProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, userAuth } = useUserAuth();

  const handleSubmit = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (type === "sign-up") {
      if (!fullname || fullname.length < 3) {
        return toast.error("Fullname must be at least 3 characters long");
      }

      if (!email || !email.length) {
        return toast.error("Email is required");
      }

      if (!emailRegex.test(email)) {
        return toast.error(
          "Invalid email address. Please provide a valid email"
        );
      }

      if (!passwordRegex.test(password)) {
        return toast.error(
          `Invalid password. 
        Password must be 6 to 20 characters long,
        Include at least one digit,
        One lowercase letter,
        One uppercase letter`,
          {
            duration: 10000,
          }
        );
      }
    }

    if (type === "sign-in") {
      if (!email || !email.length) {
        return toast.error("Email is required");
      }
    }

    const payload = {
      email,
      password,
      type,
      ...(type === "sign-up" && { fullname }),
    };
    userAuth(payload);

    setFullname("");
    setEmail("");
    setPassword("");

    console.log(fullname + "\n" + email + "\n" + password);
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col gap-4 "
      >
        {type === "sign-up" ? (
          <h1 className="font-SourceCodePro text-center mb-8 text-4xl capitalize">
            Join us today
          </h1>
        ) : (
          <h1 className="font-SourceCodePro text-center mb-8 text-4xl capitalize">
            Welcome Back
          </h1>
        )}{" "}
        {type !== "sign-in" ? (
          <InputBox
            name="fullname"
            type="text"
            size="sm"
            placeholder="Enter your full name"
            icon={<GoPerson />}
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
        ) : (
          ""
        )}
        <InputBox
          name="email"
          type="email"
          size="sm"
          placeholder="Enter your email"
          icon={<GoMention />}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <InputBox
          name="password"
          type="password"
          size="sm"
          placeholder="Enter your password"
          icon={<GoKey />}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          className="capitalize font-SometypeMono"
          radius="full"
          type="submit"
        >
          {type.replace("-", " ")}
        </Button>
        <div className="relative w-full flex items-center gap-2 my-4 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <Button className="capitalize font-SometypeMono" radius="full">
          <FcGoogle />
          continue with google
        </Button>
        {type === "sign-in" ? (
          <p className="text-gray-500 font-SometypeMono text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black ml-1">
              Join us today
            </Link>
          </p>
        ) : (
          <p className="text-gray-500 font-SometypeMono text-center">
            Already a member ?
            <Link to="/signin" className="underline text-black ml-1">
              Sign in here
            </Link>
          </p>
        )}
      </form>
    </section>
  );
}

export default UserAuthForm;
