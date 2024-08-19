import Image from "next/image";
import { HOBSPOT_ICON_URL } from "@/data/urls/images.url";

const HubspotIcon = ({...others}: {others: [key: string]: any}) => {
  return (
    <>
      <Image src={HOBSPOT_ICON_URL} width={100} height={100}></Image>
    </>
  );
};
