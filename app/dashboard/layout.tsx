import React from "react";
import LeftSideBar from "@/components/layout/LeftSideBar";
import ToBar from "@/components/layout/ToBar";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userId } = auth();
  if (!userId)
    return (
      <div className="h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  return (
    <div className="h-screen flex max-lg:flex-col text-grey-1">
      <LeftSideBar />
      <ToBar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
