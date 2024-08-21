// app/setting/layout.tsx

import NavTitle from "@/components/Nav/Title";
import { ROUTE_SETTING } from "@/data/routes";
import SettingLayout from "@/layouts/SettingLayout";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavTitle>
        <Link href={ROUTE_SETTING}>Setting</Link>
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="relative card min-h-full overflow-auto flex flex-col">
          <SettingLayout>{children}</SettingLayout>
        </div>
      </div>
    </>
  );
};

export default Layout;
