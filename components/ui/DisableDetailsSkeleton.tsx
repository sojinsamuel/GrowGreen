import { Skeleton } from "@/components/ui/skeleton";

export default function DiseaseDetailsSkeleton() {
  return (
    <div className="px-4 mt-3">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="mb-6">
          <Skeleton className="h-8 w-[200px] bg-gray-200 mb-1" />
        </div>
        <div className="mb-6">
          <Skeleton className="h-8 w-[200px] bg-gray-200 mb-1" />
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-full my-2 bg-gray-200" />
          ))}
        </div>
        <div className="mb-6">
          <Skeleton className="h-8 w-[200px] bg-gray-200 mb-1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="rounded-lg shadow-lg">
                  <Skeleton className="h-48 w-48 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[200px] bg-gray-200 mb-1" />
          <div className="grid gap-4 ml-3">
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-1">
                  <Skeleton className="h-6 w-[150px] bg-gray-200" />
                </h3>
                <ul className="list-none pl-6">
                  {[...Array(4)].map((_, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
