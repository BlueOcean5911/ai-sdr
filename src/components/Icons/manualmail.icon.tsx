import Image from "next/image";
import { MANUAL_EMAIL_ICON_URL } from "@/data/urls/images.url";

const ManualEmailIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={MANUAL_EMAIL_ICON_URL}
        width={40}
        height={40}
        alt="manual email icon"
        {...others}
      ></Image>
    </>
  );
};

export default ManualEmailIcon;
