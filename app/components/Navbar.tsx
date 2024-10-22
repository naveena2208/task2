import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="m-4 flex justify-between">
      <h3 className="font-bold text-2xl">Flight Status Tracker</h3>
      <button
        type="button"
        onClick={() => router.push("/components/login")}
        className="py-2.5 px-5 me-2 mb-2 text-lg font-medium 
        text-black focus:outline-none rounded-lg border border-gray-500 hover:bg-white hover:text-blue-700 hover:border-white focus:border-white focus:z-10 focus:ring-4 focus:ring-white focus:bg-white dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        LOG IN
      </button>
    </nav>
  );
};

export default Navbar;
