import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination() {
  return (
    <div className="flex flex-row justify-center items-center bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="hidden sm:flex sm:flex-1 sm:items-center">
        <nav
          aria-label="Pagination"
          className="isolate inline-flex rounded-md shadow-xs"
        >
          <span className="relative inline-flex items-center hover:bg-gray-50">
            <ChevronLeftIcon className="size-8 text-stone-500 " />
          </span>
          <span
            aria-current="page"
            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            1
          </span>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 ">
            2
          </span>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            3
          </span>
          <span className="relative inline-flex items-center hover:bg-gray-50">
            <ChevronRightIcon className="size-8 text-stone-500" />
          </span>
        </nav>
      </div>
    </div>
  );
}
