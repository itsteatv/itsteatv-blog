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
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ItsteatvLogo from "./ItsteatvLogo";
import SearchInput from "./SearchInput";
import { useCookies } from "react-cookie";
import { useUserData } from "../hooks/useUserData";
import { useSignout } from "../hooks/useSignout";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { isLoading, user } = useUserData();
  const { isPending, signout } = useSignout();
  console.log(isLoading, user);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Help & Feedback,",
    "Sign Up",
    "Sign In",
    "write",
  ];

  const isAuthItem = (item: string) => item === "Sign Up" || item === "Sign In";
  const isAuthenticated = !!cookies.access_token;

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

        {isAuthenticated ? (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="default"
                  name="Jason Hughes"
                  size="sm"
                  src={user?.profile_img}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2 transition-all duration-400"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  className="transition-all duration-400"
                  key="user-profile"
                  onClick={() => navigate(`/user${user?.username}`)}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  className="transition-all duration-400"
                  key="dashboard"
                  onClick={() => navigate("/home/dashboard")}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  className="transition-all duration-400"
                  key="settings"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  className="transition-all duration-400"
                  onClick={() => navigate("/write")}
                  key="help_and_feedback"
                  color="secondary"
                >
                  Write
                </DropdownItem>
                <DropdownItem
                  className="transition-all duration-400"
                  key="logout"
                  color="danger"
                  onClick={signout}
                >
                  <div>
                    <p className="font-bold">Sign Out</p>
                    <p>@{user?.username}</p>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="gap-2 hidden sm:flex">
              <Button
                className="my-auto"
                color="default"
                variant="faded"
                radius="lg"
                size="sm"
                onClick={() => navigate("signup")}
              >
                Sign Up
              </Button>
              <Button
                className="my-auto bg-black text-white"
                color="primary"
                size="sm"
                variant="flat"
                radius="lg"
                onClick={() => navigate("signin")}
              >
                Sign In
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
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
