import Link from "next/link";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { AlignJustify, Search, User } from "lucide-react";
import { Button } from "../../ui/button";
import ThemeSwitcher from "../../ThemeSwitcher"
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
const Header = (props) => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white drop-shadow-1 dark:bg-slate-900 dark:drop-shadow-none">
      <div className="flex flex-grow items-center lg:justify-end justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <Button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-30 block rounded-sm bg-white hover:bg-slate-200 p-1.5 shadow-sm dark:bg-slate-900 dark:hover:bg-slate-50 lg:hidden"
          >
            <AlignJustify className="text-black dark:text-white dark:hover:text-black  "/>
          </Button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden " href="/">
            <Image
              width={150}
              height={50}
              src={theme === "dark" ? "/WhiteLogo.png" : "/BlackLogo.png"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex items-center  md:gap-1">
          <ul className="flex items-center ">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeSwitcher/>
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          {session ? (
            <DropdownUser/>    
          ): (
            <Link href={"/login"} className="flex items-center justify-center gap-2">
              <span>Sign in</span>
              <User/>
            </Link>
          )}
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>

  );
};

export default Header;
