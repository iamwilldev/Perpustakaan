import { useStateContext } from "../context/ContextProvider"

export default function Toast() {
    const {toast} = useStateContext();

    return (
        <>
            {toast.show &&
                <div className="py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 bottom-4 z-50">
                    {toast.message}
                </div>
            }
        </>
    )
}
