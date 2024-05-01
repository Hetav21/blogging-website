export function FullBlogSkeleton() {
    return <div>
        <div className="flex justify-center">
            <div role="status" className="animate-pulse">
                <div className="grid lg: grid-cols-12 w-screen px-10 pt-16 max-w-screen-xl gap-4">
                    <div className="lg: col-span-8">

                        <div className="text-3xl font-extrabold">
                            <div className="h-7 w-full bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="inline-flex gap-1 items-center text-slate-400 pt-3">
                            <div className="h-4 w-48 bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                            <div className="h-5 w-full bg-gray-200 rounded-full"></div>
                        </div>
                    </div>

                    <div className="lg: col-span-4">
                        <div className="text-xl max-w-screen-md">Author</div>
                        <div className="flex pt-4 gap-4 place-items-start">
                            <div className="">
                                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="">
                                <div className="mt-2 h-6 w-36 bg-gray-200 rounded-full"></div>

                                <div className="pt-2 text-slate-400 space-y-2">
                                <div className="h-4 w-80 bg-gray-200 rounded-full"></div>
                                <div className="h-4 w-80 bg-gray-200 rounded-full"></div>
                                <div className="h-4 w-80 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
}