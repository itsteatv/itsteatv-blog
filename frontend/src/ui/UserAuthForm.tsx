import { GoPerson } from "react-icons/go";
import { GoMention } from "react-icons/go";
import { GoKey } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import InputBox from "./InputBox";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

type UserAuthFormProps = {
  type: string;
};

function UserAuthForm({ type }: UserAuthFormProps) {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <form className="flex items-center justify-center flex-col gap-4 ">
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
            icon={<GoMention />}
          />
        ) : (
          ""
        )}
        <InputBox
          name="email"
          type="email"
          size="sm"
          placeholder="Enter your email"
          icon={<GoPerson />}
        />
        <InputBox
          name="password"
          type="password"
          size="sm"
          placeholder="Enter your password"
          icon={<GoKey />}
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
