import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader() {
  return (
    <div className="mb-5">
      <div className="space-y-4 mt-4 flex flex-col md:flex-row items-center justify-center gap-5 px-3 py-5">
        <div className="">
          <div className="w-full rounded-md p-1 bg-[#1f2937]">
            <Skeleton className="h-48 w-48 " />
          </div>
        </div>
        <div className="items-center">
          <Skeleton className="h-8 w-[250px] bg-[#1f2937] mb-2" />
          {/* Name skeleton */}
          <Skeleton className="h-6 w-[30vw] bg-[#1f2937]" />
          {/* Description skeleton */}
          <ul className="text-xl">
            <li>
              <Skeleton className="h-6 w-[100px] bg-[#1f2937] mt-2" />
              {/* Temperature skeleton */}
            </li>
          </ul>
          <Skeleton className="h-12 w-[150px] mt-3 bg-[#1f2937]" />
          {/* Button skeleton */}
        </div>
      </div>
      <h3 className="text-lg font-extrabold my-5">
        <Skeleton className="h-8 w-[200px] bg-[#1f2937]" />
        {/* Buy Seeds Title skeleton */}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
        {[...Array(6)].map((_, index) => (
          <a
            target="_blank"
            key={index}
            href="#"
            className="border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out"
          >
            <div className="border-b p-5 flex-1">
              <Skeleton className="h-8 w-[150px] bg-[#1f2937]" />
              {/* Seed Title skeleton */}
            </div>
            <div className="px-4 py-2 not-italic">
              <Skeleton className="h-6 w-[100px] bg-[#1f2937]" />
              {/* Seed Price skeleton */}
            </div>
          </a>
        ))}
      </div>
      <h3 className="text-lg font-extrabold my-5">
        <Skeleton className="h-8 w-[250px] bg-[#1f2937]" />
        {/* Related Articles Title skeleton */}
      </h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition duration-200 ease-in-out"
          >
            <Skeleton className="h-8 w-[200px] bg-[#1f2937] mb-2" />
            <Skeleton className="h-6 w-[150px] bg-[#1f2937]" />
          </div>
        ))}
      </div>
    </div>
  );
}
