import Image from "next/image";
import { LINKEDIN_INTERACT_ICON_URL } from "@/data/urls/images.url";

const LinkedinInteractIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={LINKEDIN_INTERACT_ICON_URL}
        width={43}
        height={48}
        alt="linkedin interact icon"
        {...others}
      ></Image>
    </>
  );
};

export default LinkedinInteractIcon;
