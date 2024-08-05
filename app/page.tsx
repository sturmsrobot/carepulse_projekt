import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen mac-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image />
        </div>
      </section>
    </div>
  );
}
