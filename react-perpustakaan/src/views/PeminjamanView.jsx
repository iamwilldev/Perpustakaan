import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios';
import Select from "react-tailwindcss-select";
import PageComponent from '../components/PageComponent';
import TButton from '../components/core/TButton';
import BooksList from '../components/BooksList';

export default function PeminjamanView() {
  const {showToast} = useStateContext();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] =useState(null);
  const [books, setBooks] = useState([]);
  const [booksID, setBooksID] =useState(null);
  const [selectedBooksId, setSelectedBooksId] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');

  const getUsers = (url)  => {
      url = url || '/users'
      setLoading(true)
      axiosClient.get(url)
          .then(({data}) => {
              setUsers(data.data)
              setLoading(false)
          })
  }

  const getBooks = (url)  => {
      url = url || '/buku'
      setLoading(true)
      axiosClient.get(url)
          .then(({data}) => {
              setBooks(data.data)
              setLoading(false)
          })
  }

  useEffect(() => {
      getUsers()
      getBooks()
  }, [])

  const optionsUser = users.map(user => ({
    value: user.id,
    label: user.name
  }));

  const optionsBooks = books.map(books => ({
    value: books.id,
    label: books.name
  }));

  const handleChangeUser = value => {
    setUserID(value);
  };

  const handleChangeBooks = value => {
    setBooksID(value);

    // selected books id
    const selectedBooksId = value.map(v => v.value);
    setSelectedBooksId(selectedBooksId);
  };

  return (
    <PageComponent title='Tambah Peminjaman Baru'>
      { loading && <div className="text-center text-lg"> Loading... </div>}
      { !loading &&
      <form action="#" method="post" onSubmit=''>
          <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  {error && (
                      <div className='bg-red-500 text-white py-3 px-3'>
                          {error}
                      </div>
                  )}
                  
                  {/* name */}
                  <div>
                      <label htmlFor="nameuser" className='block text-sm font-medium text-gray-700'>Nama user</label>
                      <Select
                          value={userID}
                          name="user_id"
                          id="nameuser"
                          onChange={handleChangeUser}
                          options={optionsUser}
                          isSearchable
                          placeholder='Pilih User'
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
                  {/* name */}
                  {/* buku */}
                  <div>
                      <label htmlFor="books_id" className='block text-sm font-medium text-gray-700'>Buku</label>
                      <Select
                          value={booksID}
                          name="books_id"
                          id="books_id"
                          onChange={handleChangeBooks}
                          options={optionsBooks}
                          isSearchable
                          isMultiple
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
                  {/* buku */}
                  {/* tampilkan buku yang dipilih berdasarkan booksID */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                      {books.filter(book => selectedBooksId.includes(book.id)).map(book => (
                          <BooksList books={book} key={book.id}/>
                      ))}
                  </div>
                  {/* tampilkan buku yang dipilih berdasarkan booksID */}
                  {/* tanggal pinjam */}
                  <div>
                      <label htmlFor="tgl_pinjam" className='block text-sm font-medium text-gray-700'>Tanggal Pinjam</label>
                      <input
                          type="date"
                          name="tgl_pinjam"
                          id="tgl_pinjam"
                          value={users.tgl_pinjam}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  tgl_pinjam: ev.target.value
                              })
                          }
                          placeholder='Tanggal Pinjam'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* tanggal pinjam */}
                  {/* tanggal kembali */}
                  <div>
                      <label htmlFor="tgl_kembali" className='block text-sm font-medium text-gray-700'>Tanggal Kembali</label>
                      <input
                          type="date"
                          name="tgl_kembali"
                          id="tgl_kembali"
                          value={users.tgl_kembali}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  tgl_kembali: ev.target.value
                              })
                          }
                          placeholder='Tanggal Kembali'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
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
