import Image from "next/image";
import { ROUTE_DASHBOARD } from "@/data/routes";
import Link from "next/link";
import { LOGO_IMAGE_URL } from "@/data/urls/images.url";

export default function Logo() {
  return (
    <div className="flex-center shrink-0">
      <Link href={ROUTE_DASHBOARD}>
        <div className="flex-center gap-1">
          <Image
            alt="AIVIO"
            src={LOGO_IMAGE_URL}
            width={128}
            height={28}
            priority
          />
        </div>
      </Link>
    </div>
  );
}
