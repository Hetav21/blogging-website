export function Quote() {
    return (
        <div className="bg-slate-200 h-screen justify-center hidden lg:flex lg:flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-start text-3xl font-bold">
                        "A reader lives a thousand lives before he dies . . . <br />The man who never reads lives only one."
                    </div>
                    <div className="max-w-xl text-xl font-semibold mt-4">
                        George R.R. Martin
                    </div>
                    <div className="max-w-xl text-md font-medium mt-2 text-slate-400">
                        Novelist | A Song of Ice and Fire
                    </div>
                </div>
            </div>
        </div>
    )
}