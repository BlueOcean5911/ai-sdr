import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-row gap-2">
        <div className="w-60 p-2 flex flex-col gap-2 gap rounded-md border">
          <div className="flex flex-row justify-between gap-2 text-sm">
            <span>All messages</span>
            <span>0</span>
          </div>
          <span>STATUS</span>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Willing to meet</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Follow-up question</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Referred to other person</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Out of office</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Not the right person</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Not interested</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Unsubscibed</span>
            <span>0</span>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            <span>*</span>
            <span className="grow">Uncategorized</span>
            <span>0</span>
          </div>
          <span>MAILBOX</span>
          <div className="flex flex-row gap-2 text-sm">
            <span className="grow">dev.freshworks@gmail.com</span>
            <span>0</span>
          </div>
        </div>
        <div className="p-2 flex flex-1 rounded-md border">
          <div className="flex flex-1 flex-col justify-center items-center text-center gap-2">
            <Image
              src={"/assets/images/nodata.svg"}
              alt={"nodata"}
              width={120}
              height={120}
            />
            <span>No new messages</span>
            <span className="w-1/2 text-xs">
              You'll see new email message here whenever they come in.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
