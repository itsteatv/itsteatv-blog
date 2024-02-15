import { Link } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

function BlogEditor() {
  return (
    <div className="flex items-center font-bold font-SometypeMono">
      <Navbar>
        <NavbarBrand>
          <Link to="..">
            <ItsteatvLogo />
          </Link>
          <p className="font-bold text-inherit hidden sm:flex">New Blog</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="flex gap-2">
            <Button
              color="success"
              variant="solid"
              radius="full"
              className="text-white"
            >
              Publish
            </Button>
            <Button color="default" variant="light" radius="full">
              Save Draft
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

export default BlogEditor;
