import Image from "next/image";
import { MICROSOFT_EXCEL_ICON_URL } from "@/data/urls/images.url";

const ExcelIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={MICROSOFT_EXCEL_ICON_URL}
        width={100}
        height={100}
        alt="hubpost icon"
        {...others}
      ></Image>
    </>
  );
};

export default ExcelIcon;
