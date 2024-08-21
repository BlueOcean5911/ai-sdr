import Image from "next/image";
import { CONQUOR_ICON_URL } from "@/data/urls/images.url";

const ConquorIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={CONQUOR_ICON_URL}
        width={100}
        height={100}
        alt="conquor icon"
        {...others}
      ></Image>
    </>
  );
};

export default ConquorIcon;
