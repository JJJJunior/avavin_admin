"use client"
import React from 'react';
import Image from "next/image";
import {navLinks} from "@/lib/constants";
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {Menu} from "lucide-react";
import {usePathname} from "next/navigation";

const ToBar = () => {
  const [dropDownMenu, setDropDownMenu] = React.useState(false);

  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image
        src={"https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        alt="logo" width={150} height={70}/>
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link href={link.url} key={link.label}
                className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
          ><p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center">
        <Menu className="cursor-pointer md:hidden" onClick={() => setDropDownMenu(!dropDownMenu)}/>
        {dropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link href={link.url} key={link.label} className="flex gap-4 text-body-medium">{link.icon}
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton/>
      </div>
    </div>
  );
};

export default ToBar;