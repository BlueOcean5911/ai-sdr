import Image from "next/image";
import { AUTOMATIC_EMAIL_ICON_URL } from "@/data/urls/images.url";

const AutomaticEmailIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={AUTOMATIC_EMAIL_ICON_URL}
        width={40}
        height={40}
        alt="automatic email icon"
        {...others}
      ></Image>
    </>
  );
};

export default AutomaticEmailIcon;
