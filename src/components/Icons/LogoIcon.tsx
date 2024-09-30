import { LOGO_IMAGE_URL } from "@/data/urls/images.url";
import Image from "next/image";

export default function LogoIcon({ ...others }: any) {
  return (
    <>
      <Image
        alt="AIVIO"
        src={LOGO_IMAGE_URL}
        width={56}
        height={28}
        priority
        {...others}
      />
    </>
  );
}
