import { useEffect, useState } from "react";
import axiosClient from '../axios';
import PageComponent from "../components/PageComponent";
import Select from "react-tailwindcss-select";
import { useStateContext } from "../context/ContextProvider";

export default function Dashboard() {

    const [books, setBooks] = useState([]);
    const [perpus2, setPerpus2] = useState([]);
    const [loading, setLoading] = useState(false)

    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

    const getBooks = (url)  => {
        url = url || '/buku?all=true'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setBooks(data.data)
                setLoading(false)
            })
        }

    axiosClient.get('http://127.0.0.1:8001/api/buku')
        .then(({ data }) => {
            setPerpus2(data.data);
            setLoading(false);
        })

    const options = [
        {
            label: "Perpustakaan 1",
            options: books.map(book => ({
                value: book.id,
                label: `${book.name} [${book.penerbit}]`
            })),
        },
        {
            label: "Perpustakaan 2",
            options: perpus2.map(perpus => ({
                value: perpus.id,
                label: `${perpus.name} [${perpus.penerbit}]`
            })),
        },
    ];

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <PageComponent title="Dashboard">
            {/* Buku */}
            <div className='col-span-6 sm:col-span-3'>
                <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">Buku</label>
                
                <Select
                    value={animal}
                    onChange={handleChange}
                    options={options}
                    isMultiple={true}
                    isSearchable
                    formatGroupLabel={data => (
                        <div className={`py-2 text-xs flex items-center justify-between`}>
                            <span className="font-bold">{data.label}</span>
                            <span className="bg-gray-200 h-5 h-5 p-1.5 flex items-center justify-center rounded-full">
                                {data.options.length}
                            </span>
                        </div>
                    )}
                />
            </div>
        </PageComponent>
    )
}
