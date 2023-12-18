import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { ArrowTopRightOnSquareIcon, CalendarDaysIcon, ChartBarIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import TButton from './core/TButton'
import { useEffect, useState } from 'react';
import axiosClient from '../axios';

export default function BooksList({books, onDeleteClick}) {
    const [peminjaman, setPeminjaman] = useState([]);
    const [loading, setLoading] = useState(false)
    const globalBooksIdCounts = {};

    const getPeminjaman = (url)  => {
        url = url || '/peminjaman'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setPeminjaman(data.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getPeminjaman()
    }, [])

    return (
        <div className='flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]'>
            <img
                className="h-48 w-full object-cover"
                src={books.img_url}
                alt={books.name}
            />
            <h4 className='mt-4 text-lg font-bold'>{books.name}</h4>
            {/* tanggal terbit disamping name */}
            <div className='flex justify-between items-center mt-2'>
                {/* date icon */}
                <span className='flex items-center text-gray-400'>
                    <CalendarDaysIcon className='w-5 h-5 mr-2' />
                    {books.tanggal_terbit} 
                </span>
                <div className='flex items-center'>
                    <span className='text-gray-400'>{books.penerbit}</span>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: books.description }} className='overflow-hidden flex-1 '></div>
            <div className='flex justify-between items-center mt-4'>
                <div className='flex items-center'>
                    <ChartBarIcon className='w-5 h-5 mr-2' />
                    <span className='text-gray-400'>
                        {/* {peminjaman.map((peminjamanItem) => {
                            const localBooksIdCounts = {};

                            peminjamanItem.detail_peminjaman.forEach((detail) => {
                                const booksId = detail['books_id'];
                                localBooksIdCounts[booksId] = (localBooksIdCounts[booksId] || 0) + 1;
                                globalBooksIdCounts[booksId] = (globalBooksIdCounts[booksId] || 0) + 1;
                            });

                        })} */}
                        {books.stock - (globalBooksIdCounts[books.id] || 0)}
                            
                    </span>
                </div>
                <span className='text-gray-400'>Rp. 500/hari</span>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <TButton to={`/buku/${books.id}` }>
                    <PencilIcon className='w-5 h-5 mr-2'>
                        Edit
                    </PencilIcon>
                </TButton>
                <div className='flex items-center'>
                    <TButton href={`/view/buku/${books.img}`} circle link>
                        <ArrowTopRightOnSquareIcon className='w-5 h-5' />
                    </TButton>

                    {books.id && (
                        <TButton onClick={ev => onDeleteClick(books.id)} circle link color='red'>
                            <TrashIcon className='w-5 h-5' />
                        </TButton>
                    )}
                </div>
            </div>

        </div>
    )
}
