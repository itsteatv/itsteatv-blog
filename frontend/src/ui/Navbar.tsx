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
import { useNavigate } from "react-router-dom";
import { GoLog } from "react-icons/go";
import { Outlet } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import SearchInput from "./SearchInput";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Help & Feedback,",
    "Sign Up",
    "Sign In",
    "write",
  ];

  const isAuthItem = (item: string) => item === "Sign Up" || item === "Sign In";

  const handleMenuItemClick = (item: string) => {
    if (isAuthItem(item)) {
      navigate(item.toLowerCase().replace(" ", ""));
    }
  };

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
          <NavbarBrand className="cursor-pointer" onClick={() => navigate("/")}>
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
            <Button
              color="default"
              size="md"
              onClick={() => navigate("signup")}
            >
              Sign Up
            </Button>
            <Button
              color="primary"
              size="md"
              variant="flat"
              onClick={() => navigate("signin")}
            >
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
                onClick={() => handleMenuItemClick(item)}
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
