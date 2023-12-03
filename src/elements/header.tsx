import Image from "next/image";
import Logo from "../../assets/logo.svg";
import Moon from "../../assets/icon-moon.svg";
import Sun from "../../assets/icon-sun.svg";
import Avatar from "../../assets/image-avatar.jpg";
import { useTheme } from "../providers/theme-provider";

export default function Header() {
  const { isThemeDark, toggleTheme } = useTheme();

  return (
    <header className="h-[5rem] w-full xl:w-[6rem] bg-draft-font xl:absolute left-0 xl:h-full flex flex-row xl:flex-col left-0   xl:rounded-r-xl">
      <div className="bg-primary w-[6rem] h-[5rem]  xl:w-full rounded-r-xl overflow-hidden relative flex">
        <div className="bg-primary-light w-[10rem] h-[2.5rem] rounded-xl overflow-hidden self-end transform -skew-x-12 l-9 absolute bottom-0 "></div>
        <Image src={Logo} alt="logo" className="w-8 h-8 block m-auto z-10" />
      </div>
      <button
        className="ml-auto xl:ml-0 xl:mt-auto flex justify-center items-center p-8 border-r xl:border-r-0 xl:border-b border-primary-darker"
        onClick={(e) => toggleTheme(!isThemeDark)}
      >
        {isThemeDark ? (
          <Image src={Sun} alt="sun" />
        ) : (
          <Image src={Moon} alt="moon" />
        )}
      </button>
      <div className="flex justify-center items-center p-8  py-4 my-2 ">
        <Image
          src={Avatar}
          alt="avatar"
          className="h-[2rem] w-[2rem] rounded-full "
        />
      </div>
    </header>
  );
}
