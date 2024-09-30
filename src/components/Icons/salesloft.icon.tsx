import Image from "next/image";
import { SALESLOFT_ICON_URL } from "@/data/urls/images.url";

const SalesloftIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={SALESLOFT_ICON_URL}
        width={100}
        height={100}
        alt="salesloft icon"
        {...others}
      ></Image>
    </>
  );
};

export default SalesloftIcon;
