import Image from "next/image";
import { LINKEDIN_REQUEST_ICON_URL } from "@/data/urls/images.url";

const LinkedinRequestIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={LINKEDIN_REQUEST_ICON_URL}
        width={43}
        height={48}
        alt="linkedin request icon"
        {...others}
      ></Image>
    </>
  );
};

export default LinkedinRequestIcon;
