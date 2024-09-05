import Image from "next/image";
import { LINKEDIN_VIEW_ICON_URL } from "@/data/urls/images.url";

const LinkedinViewIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={LINKEDIN_VIEW_ICON_URL}
        width={43}
        height={48}
        alt="linkedin view icon"
        {...others}
      ></Image>
    </>
  );
};

export default LinkedinViewIcon;
