import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GoLog } from "react-icons/go";
import { Outlet } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import SearchInput from "./SearchInput";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Help & Feedback,",
    "Sign Up",
    "Sign In",
    "write",
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NextUiNavbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="font-SometypeMono"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <ItsteatvLogo />
            <p className="font-bold text-inherit">itsteatv</p>
            {windowWidth >= 640 && <SearchInput />}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="hidden">
            <Link className="cursor-pointer" color="foreground">
              Profile
            </Link>
          </NavbarItem>
          <NavbarItem isActive className="hidden">
            <Link className="cursor-pointer" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden">
            <Link className="cursor-pointer" color="foreground">
              Help & Feedback
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="gap-2 hidden sm:flex">
            <Button
              radius="full"
              variant="flat"
              className="sm:flex hidden bg-transparent"
            >
              <GoLog />
              Write
            </Button>
            <Button color="default" size="md">
              Sign Up
            </Button>
            <Button color="primary" size="md" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          {windowWidth <= 640 && <SearchInput />}
        </NavbarMenu>
      </NextUiNavbar>
      <Outlet />
    </>
  );
}

export default Navbar;
