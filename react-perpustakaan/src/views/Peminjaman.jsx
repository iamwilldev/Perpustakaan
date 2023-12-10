import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios";
import TButton from "../components/core/TButton";
import PeminjamanList from "../components/PeminjamanList";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function Peminjaman() {
    const {showToast} = useStateContext();
    const [peminjaman, setPeminjaman] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false)

    const getPeminjaman = (url)  => {
        url = url || '/peminjaman'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setPeminjaman(data.data)
                setMeta(data.meta)
                setLoading(false)
            })
    }

    useEffect(() => {
        getPeminjaman()
    }, [])

    return (
        <PageComponent title="Peminjaman" buttons={(
            <TButton color="green" to="/peminjaman/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" /> Tambah Peminjaman
            </TButton>
        )}>
            { loading && <div className="text-center text-lg"> Loading... </div>}
            { !loading && (
                <div>
                    {peminjaman.length === 0 && <div className="py-8 text-center text-gray-700">Tidak ada peminjaman tersimpan</div>}
                    {peminjaman.length >= 1 && 
                        <div className="px-8">
                            <PeminjamanList peminjaman={peminjaman} key={peminjaman.id}/>
                        </div>
                    }
                </div>
            )}
        </PageComponent>
    )
}
