import Image from "next/image";
import { ROUTE_DASHBOARD } from "@/data/routes";
import Link from "next/link";
import { LOGO_IMAGE_URL } from "@/data/images";

export default function Logo() {
  return (
    <div className="flex-center shrink-0">
      <Link href={ROUTE_DASHBOARD}>
        <div className="flex-center gap-2">
          <Image
            alt="AIVIO"
            src={LOGO_IMAGE_URL}
            width={28}
            height={24}
            priority
          />
          <span className="text-2xl weight font-bold">AIVIO</span>
        </div>
      </Link>
    </div>
  );
}
