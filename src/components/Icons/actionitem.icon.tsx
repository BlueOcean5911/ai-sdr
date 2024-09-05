import Image from "next/image";
import { ACTION_ITEM_ICON_URL } from "@/data/urls/images.url";

const ActionItemIcon = ({ ...others }: { [key: string]: any }) => {
  return (
    <>
      <Image
        src={ACTION_ITEM_ICON_URL}
        width={40}
        height={40}
        alt="action item icon"
        {...others}
      ></Image>
    </>
  );
};

export default ActionItemIcon;
