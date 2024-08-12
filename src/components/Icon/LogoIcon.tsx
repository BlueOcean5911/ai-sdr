import { LOGO_IMAGE_URL } from "@/data/images";
import Image from "next/image";

export default function LogoIcon({ ...others }: any) {
  return (
    <>
      <Image
        alt="AIVIO"
        src={LOGO_IMAGE_URL}
        width={28}
        height={24}
        priority
        {...others}
      />
    </>
  );
}
