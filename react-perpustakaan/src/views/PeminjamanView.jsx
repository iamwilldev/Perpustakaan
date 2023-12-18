import { useEffect, useState } from "react";
import axiosClient from '../axios';
import PageComponent from "../components/PageComponent";
import Select from "react-tailwindcss-select";
import TButton from '../components/core/TButton';
import { useStateContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";

export default function PeminjamanView() {
    const {showToast} = useStateContext();
    const navigate = useNavigate();
    const {id} = useParams()
    const [peminjaman, setPeminjaman] = useState({
        user_id: '',
        tgl_pinjam: '',
        tgl_kembali: '',
        details: [],
    });
    const [users, setUsers] = useState([]);
    const [userID, setUserID] =useState(null);
    const [books, setBooks] = useState([]);
    const [bookID, setBookID] =useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const getUsers = (url)  => {
        url = url || '/users?all=true'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setUsers(data.data)
                setLoading(false)
            })
        }

    const getBooks = (url)  => {
        url = url || '/buku?all=true'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setBooks(data.data)
                setLoading(false)
            })
        }

    const onSubmit = (ev) => {
        ev.preventDefault();
        
        const payload = { ...peminjaman }

        if (!payload.details.length){
            showToast('Buku harus dipilih')
            return;
        }

        let res = null;
        if (id) {
            res = axiosClient.put(`/peminjaman/${id}`, payload)
        } else {
            res = axiosClient.post('/peminjaman', payload)
        }

        res.then((res) => {
            navigate('/peminjaman');
            if (id) {
                showToast('Peminjaman berhasil diupdate')
            } else {
                showToast('Peminjaman berhasil ditambahkan')
            }
        })
        .catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message)
            }
        })
    }

    const optionsUser = users.map(user => ({
        value: user.id,
        label: `${user.name} [${user.nim}]`
    }));

    const optionsBook = books.map(book => ({
        value: book.id,
        label: `${book.name} [${book.penerbit}]`
    }));

    useEffect(() => {
        if (id) {
            setLoading(true)
            axiosClient.get(`/peminjaman/${id}`)
                .then(({data}) => {
                    setPeminjaman(data.data)
                    setLoading(false)
                })
                .catch((err) => {
                    if (isRouteErrorResponse(err)) {
                        navigate('/peminjaman')
                    }
                })
        };
        getUsers()
        getBooks()
    }, [])

    return (
        <PageComponent title='Tambah Peminjaman Baru'>
            { loading && <div className="text-center text-lg"> Loading... </div>}
            { !loading &&
            <form action="Tambah Peminjaman Baru" method="post" onSubmit={onSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md'>
                    <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                        {error && (
                            <div className='bg-red-500 text-white py-3 px-3'>
                                {error}
                            </div>
                        )}
                        {/* Peminjam */}
                        <div className='col-span-6 sm:col-span-3'>
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">Peminjam</label>
                            
                            <Select
                                value={optionsUser.find(option => option.value === peminjaman.user_id)}
                                name="user_id"
                                id="user_id"
                                onChange={(ev) => {
                                    setPeminjaman({
                                        ...peminjaman,
                                        user_id: ev.value
                                    }),
                                    setUserID(ev)
                                }}
                                options={optionsUser}
                                isSearchable
                                placeholder='Pilih Peminjam'
                                classNames={{
                                    menuButton: ({ isDisabled }) => (
                                        `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                            isDisabled
                                                ? "bg-gray-200"
                                                : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                        }`
                                    ),
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                    listItem: ({ isSelected }) => (
                                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                            isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                        }`
                                    )
                                }}
                            />
                        </div>
                        {/* Peminjam */}
                        {/* Buku */}
                        <div className='col-span-6 sm:col-span-3'>
                            <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">Buku</label>
                            
                            <Select
                                value={optionsBook.filter(option => peminjaman.details && peminjaman.details.some(detail => detail.book_id === option.value))}
                                name="book_id"
                                id="book_id"
                                onChange={(selectedOptions) => {
                                    const selectedBookIDs = selectedOptions.map(option => option.value);
                                    setPeminjaman({
                                        ...peminjaman,
                                        details: selectedBookIDs.map(book_id => ({ book_id })),
                                    });
                                    setBookID(selectedOptions);
                                }}
                                options={optionsBook}
                                isSearchable
                                isMultiple={true}
                                placeholder='Pilih Buku'
                                classNames={{
                                    menuButton: ({ isDisabled }) => (
                                        `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                            isDisabled
                                                ? "bg-gray-200"
                                                : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                                        }`
                                    ),
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                    listItem: ({ isSelected }) => (
                                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                            isSelected
                                                ? `text-white bg-blue-500`
                                                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                                        }`
                                    )
                                }}
                            />
                        </div>
                        {/* Buku */}
                        {/* preview buku */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {books.filter(book => peminjaman.details && peminjaman.details.some(detail => detail.book_id === book.id)).map(book => (
                                <div className="bg-white overflow-hidden shadow rounded-lg" key={book.id}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {book.name}
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {book.penerbit}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* preview buku */}
                        {/* Tgl Pinjam */}
                        <div className='col-span-6 sm:col-span-3'>
                            <label htmlFor="tgl_pinjam" className="block text-sm font-medium text-gray-700">Tanggal Pinjam</label>

                            <input type="date" name="tgl_pinjam" id="tgl_pinjam" 
                                value={peminjaman.tgl_pinjam} 
                                onChange={(ev) =>
                                    setPeminjaman({ ...peminjaman, tgl_pinjam: ev.target.value})
                                } 
                                placeholder="Peminjam"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                        </div>
                        {/* Tgl Pinjam */}

                        {/* Tgl Kembali */}
                        <div className='col-span-6 sm:col-span-3'>
                            <label htmlFor="tgl_kembali" className="block text-sm font-medium text-gray-700">Tanggal Kembali</label>

                            <input type="date" name="tgl_kembali" id="tgl_kembali" 
                                value={peminjaman.tgl_kembali} 
                                onChange={(ev) =>
                                    setPeminjaman({ ...peminjaman, tgl_kembali: ev.target.value})
                                } 
                                placeholder="Peminjam"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                        </div>
                        {/* Tgl Kembali */}
                        <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                            <TButton>
                                Save
                            </TButton>
                        </div>
                    </div>
                </div>
            </form>
            }
        </PageComponent>
    )
}