import { Circle } from "./BlogCard"

export function BlogSkeleton() {
    return <div className="flex justify-center">
        <div role="status" className="animate-pulse">
            <div className="p-4 border-solid border-b-2 border-slate-200 w-screen max-w-screen-md">

                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>

                    <div className="h-3.5 w-20 bg-gray-200 rounded-full"></div>

                    <Circle></Circle>

                    <div className="h-3.5 w-24 bg-gray-200 rounded-full"></div>

                </div>

                <div className="text-xl font-semibold pt-2">
                    <div className="h-5 bg-gray-200 rounded-full mb-2"></div>
                </div>

                <div className="text-md font-light">
                    <div className="h-4 bg-gray-200 rounded-full mb-3.5"></div>
                </div>

                <div className="text-slate-500 text-sm font-light mt-2">
                    <div className="h-3 max-w-20 bg-gray-200 rounded-full"></div>
                </div>

            </div>

        </div>
        {/* <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div> */}
        <span className="sr-only">Loading...</span>
    </div>

}