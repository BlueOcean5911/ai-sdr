import Image from "next/image";
import {
  MICROSOFT_EXCEL_ICON_URL,
  OUTREACH_ICON_URL,
} from "@/data/urls/images.url";

const OutreachIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={OUTREACH_ICON_URL}
        width={100}
        height={100}
        alt="outreach icon"
        {...others}
      ></Image>
    </>
  );
};

export default OutreachIcon;
