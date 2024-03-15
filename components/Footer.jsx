"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center">
      <div className="container p-6 mx-auto">
        <div className="">
          <span className="flex items-center justify-center w-full">
            <span className="mr-4">Rejoignez-nous !</span>
            <button
              type="button"
              className="inline-block rounded-full border-2 border-black px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-[#34469C] hover:bg-[#34469C] hover:bg-opacity-10 hover:text-[#34469C] focus:border-[#34469C] focus:text-[#34469C] focus:outline-none focus:ring-0  active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              <Link href="/joinUsForm">Nous rejoindre</Link>
            </button>
          </span>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="flex p-4 items-center justify-center">
        <p> © 2024 Copyright : Swipp</p>
      </div>
    </footer>
  );
}
