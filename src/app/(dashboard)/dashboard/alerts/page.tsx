import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="p-2 flex flex-1 rounded-md border">
        <div className="flex flex-1 flex-col justify-center items-center text-center gap-2">
          <Image
            src={"/assets/images/nodata.svg"}
            alt={"nodata"}
            width={120}
            height={120}
          />
          <span>No new alerts</span>
        </div>
      </div>
    </>
  );
}
