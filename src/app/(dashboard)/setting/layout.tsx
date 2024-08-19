import NavTitle from "@/components/Nav/Title";
import SettingLayout from "@/layouts/SettingLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavTitle>Setting</NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="relative card min-h-full overflow-auto flex flex-col">
          <SettingLayout>{children}</SettingLayout>
        </div>
      </div>
    </>
  );
};

export default Layout;
