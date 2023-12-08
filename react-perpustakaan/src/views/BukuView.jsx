import { useState } from 'react'
import PageComponent from '../components/PageComponent'
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Input } from 'postcss';
import TButton from '../components/core/TButton';
import axiosClient from '../axios.js';
import { useNavigate } from 'react-router-dom';

export default function BukuView() {
    const navigate = useNavigate();

    const [books, setBooks] = useState({
        name: '',
        description: '',
        penerbit: '',	
        tanggal_terbit: '',
        stock: 0,
        img: null,
        img_url: null
    });

    const [error, setError] = useState('');

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setBooks({
                ...books,
                img: file,
                img_url: reader.result
            })
            ev.target.value = ""
        }
        reader.readAsDataURL(file);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...books };
        if (payload.img) {
            payload.img = payload.img_url
        }
        delete payload.img_url;

        axiosClient.post('/buku', payload)
        .then(res => {
            console.log(res)
            navigate('/buku')
        })
        .catch(err => {
            if (err && err.response) {
                setError(err.response.data.message)
            }
        });
    }

    return (
        <PageComponent title='Tambah Buku Baru'>
            <form action="#" method="post" onSubmit={onSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md'>
                    <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                        {error && (
                            <div className='bg-red-500 text-white py-3 px-3'>
                                {error}
                            </div>
                        )}
                        {/* image */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Photo</label>
                            <div className='mt-1 flex items-center'>
                                {books.img_url && (
                                    <img src={books.img_url} alt="" className='w-32 h-32 object-cover'/>
                                )}
                                {!books.img_url && (
                                    <span className='flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                                        <PhotoIcon className='w-8 h-8' />
                                    </span>
                                )}
                                <button
                                    type='button'
                                    className='relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                >
                                    <input type="file" className='absolute left-0 top-0 bottom-0 opacity-0' onChange={onImageChoose} />
                                    Change
                                </button>
                            </div>
                        </div>
                        {/* image */}
                        {/* name */}
                        <div>
                            <label htmlFor="namebook" className='block text-sm font-medium text-gray-700'>Nama buku</label>
                            <input
                                type="text"
                                name="name"
                                id="namebook"
                                value={books.name}
                                onChange={(ev) => 
                                    setBooks({
                                        ...books,
                                        name: ev.target.value
                                    })
                                }
                                placeholder='Nama Buku'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        {/* name */}
                        {/* description */}
                        <div>
                            <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Deskripsi</label>
                            <textarea
                                name="description"
                                id="description"
                                value={books.description}
                                onChange={(ev) => 
                                    setBooks({
                                        ...books,
                                        description: ev.target.value
                                    })
                                }
                                placeholder='Deskripsi'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        {/* description */}
                        {/* penerbit */}
                        <div>
                            <label htmlFor="penerbit" className='block text-sm font-medium text-gray-700'>Penerbit</label>
                            <input
                                type="text"
                                name="penerbit"
                                id="penerbit"
                                value={books.penerbit}
                                onChange={(ev) => 
                                    setBooks({
                                        ...books,
                                        penerbit: ev.target.value
                                    })
                                }
                                placeholder='Penerbit'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        {/* penerbit */}
                        {/* tanggal terbit */}
                        <div>
                            <label htmlFor="tanggal_terbit" className='block text-sm font-medium text-gray-700'>Tanggal Terbit</label>
                            <input
                                type="date"
                                name="tanggal_terbit"
                                id="tanggal_terbit"
                                value={books.tanggal_terbit}
                                onChange={(ev) => 
                                    setBooks({
                                        ...books,
                                        tanggal_terbit: ev.target.value
                                    })
                                }
                                placeholder='Tanggal Terbit'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        {/* tanggal terbit */}
                        {/* stock */}
                        <div>
                            <label htmlFor="stock" className='block text-sm font-medium text-gray-700'>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={books.stock}
                                onChange={(ev) => 
                                    setBooks({
                                        ...books,
                                        stock: ev.target.value
                                    })
                                }
                                placeholder='Stock'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                        {/* stock */}
                        <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                            <TButton>
                                Save
                            </TButton>
                        </div>
                    </div>
                </div>
            </form>
        </PageComponent>
    )
}
