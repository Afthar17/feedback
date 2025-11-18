import { ChevronDownIcon } from "lucide-react";

export default function CustomSelect() {
  return (
    <div className="relative w-full">
      <select
        className="
          w-full
          appearance-none
          bg-white
          border border-gray-300
          rounded-lg
          px-4
          py-3
          pr-10
          text-black
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:border-blue-400
          cursor-pointer
        "
      >
        <option>Regularly</option>
        <option>Occasionally</option>
        <option>Rarely</option>
      </select>

      <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}
