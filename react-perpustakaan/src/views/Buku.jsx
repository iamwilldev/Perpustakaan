import { PlusCircleIcon } from "@heroicons/react/24/solid";
import BooksList from "../components/BooksList";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";

export default function Buku() {
    const [books, setBooks] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false)

    const onDeleteClick = () => {
        console.log('On Delete')
    }

    const onPageClick = (link) => {
        getBooks(link.url)
    }

    const getBooks = (url)  => {
        url = url || '/buku'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setBooks(data.data)
                setMeta(data.meta)
                setLoading(false)
            })
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <PageComponent title="Buku" buttons={(
            <TButton color="green" to="/buku/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" /> Tambah Buku
            </TButton>
        )}>
            { loading && <div className="text-center text-lg"> Loading... </div>}
            { !loading && (
                <div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {books.map(books => (
                            <BooksList books={books} key={books.id} onDeleteClick={onDeleteClick}/>
                        ))}
                    </div>

                    <PaginationLinks meta={meta} onPageClick={onPageClick}/>
                </div>
            )}
        </PageComponent>
    )
}
