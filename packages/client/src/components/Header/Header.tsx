import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { useState } from "react";

const Header: React.FC<{}> = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  const onHanldeOpenMobileMenu = () => {
    setIsActiveMobileMenu(!isActiveMobileMenu);
  };

  return (
    <div className="!text-white !z-2">
      <nav className="mx-auto !max-w-[1200px] flex items-center justify-between p-6 lg:px-8 w-full pt-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a className="cursor-pointer !z-2" href="/">
            Dimori
          </a>
        </div>

        <div className="z-3 flex md:hidden">
          <button type="button" className="z-[2] w-[24px] h-[24px]" onClick={() => onHanldeOpenMobileMenu()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="justify">
              <path fill="white" d="M21 13H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0 5H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zm0-10H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex md:justify-end lg:flex lg:flex-1 lg:justify-end">
          <ConnectButton />
        </div>

        <div className={isActiveMobileMenu === false ? "hidden" : "md:hidden"} aria-modal="true">
          <div className="fixed inset-y-0 right-0 !z-10 overflow-y-auto px-6 py-6 bg-[#848484]">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                Dimori
              </a>
              <button type="button" className="w-[24px] h-[24px]" onClick={() => onHanldeOpenMobileMenu()}>
                <CloseOutline />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
