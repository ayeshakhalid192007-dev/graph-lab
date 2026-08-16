import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Graph Lab"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
