import Image from "next/image";
import { PHONE_CALL_ICON_URL } from "@/data/urls/images.url";

const PhoneCallIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={PHONE_CALL_ICON_URL}
        width={40}
        height={40}
        alt="phone call icon"
        {...others}
      ></Image>
    </>
  );
};

export default PhoneCallIcon;
