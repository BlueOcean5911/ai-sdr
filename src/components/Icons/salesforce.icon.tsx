import Image from "next/image";
import { SALESFORCE_ICON_URL } from "@/data/urls/images.url";

const SalesforceIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={SALESFORCE_ICON_URL}
        width={100}
        height={100}
        alt="salesforce icon"
        {...others}
      ></Image>
    </>
  );
};

export default SalesforceIcon;
