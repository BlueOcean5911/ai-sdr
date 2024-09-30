import Image from "next/image";
import { LINKEDIN_MESSAGE_ICON_URL } from "@/data/urls/images.url";

const LinkedinMessageIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={LINKEDIN_MESSAGE_ICON_URL}
        width={43}
        height={48}
        alt="linkedin message icon"
        {...others}
      ></Image>
    </>
  );
};

export default LinkedinMessageIcon;
