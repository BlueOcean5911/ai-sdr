import ThemeToggle from "@/components/Theme/ThemeToggle";
import { ROUTE_LOGIN } from "@/data/routes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-dvh flex-center flex-1">
        <div className="fixed z-50 top-0 right-0 mt-4 mr-4">
          <ThemeToggle />
        </div>
        <Link href={ROUTE_LOGIN}>
          {" "}
          <button className="btn-primary p-4 px-12 shadow-md rounded-xl text-white text-bold">
            Get Start{" "}
          </button>
        </Link>
      </div>
    </>
  );
}
