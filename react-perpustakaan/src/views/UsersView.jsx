import React, { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import { useStateContext } from '../context/ContextProvider';
import { isRouteErrorResponse, useNavigate, useParams } from 'react-router-dom';
import TButton from '../components/core/TButton';
import axiosClient from '../axios';

export default function UsersView() {
  const {showToast} = useStateContext();
  const navigate = useNavigate();
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const [users, setUsers] = useState({
      name: '',
      alamat: '',
      no_handphone: '',
      nim: '',
      email: ''
    });
  
  const onSubmit = (ev) => {
      ev.preventDefault();

      const payload = { ...users };

      let res = null;
      if (id) {
          res = axiosClient.put(`/users/${id}`, payload)
      } else {
          res = axiosClient.post('/users', payload)
      }

      res.then((res) => {
          navigate('/users');
          if (id) {
              showToast('Peminjam berhasil diupdate')
          } else {
              showToast('Peminjam berhasil ditambahkan')
          }
      })
      .catch((err) => {
          if (err && err.response) {
              setError(err.response.data.message)
          }
      })
  }

  useEffect(() => {
    // tampilkan id
      if (id) {
          setLoading(true)
          axiosClient.get(`/users/${id}`)
              .then(({data}) => {
                  setUsers(data.data)
                  setLoading(false)
              })
              .catch((err) => {
                  if (isRouteErrorResponse(err)) {
                      navigate('/users')
                  }
              })
      }
  }, [])

  return (
    <PageComponent title={!id ? 'Tambah Peminjam Baru' : 'Update Peminjam'}>
      { loading && <div className="text-center text-lg"> Loading... </div>}
      { !loading &&
      <form action="#" method="post" onSubmit={onSubmit}>
          <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  {error && (
                      <div className='bg-red-500 text-white py-3 px-3'>
                          {error}
                      </div>
                  )}
                  
                  {/* name */}
                  <div>
                      <label htmlFor="nameuser" className='block text-sm font-medium text-gray-700'>Nama peminjam</label>
                      <input
                          type="text"
                          name="name"
                          id="nameuser"
                          value={users.name}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  name: ev.target.value
                              })
                          }
                          placeholder='Nama Peminjam'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* name */}
                  {/* alamat */}
                  <div>
                      <label htmlFor="alamat" className='block text-sm font-medium text-gray-700'>Alamat</label>
                      <textarea
                          name="alamat"
                          id="alamat"
                          value={users.alamat}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  alamat: ev.target.value
                              })
                          }
                          placeholder='Deskripsi'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* alamat */}
                  {/* no handphone */}
                  <div>
                      <label htmlFor="no_handphone" className='block text-sm font-medium text-gray-700'>No. Handphone</label>
                      <input
                          type="text"
                          name="no_handphone"
                          id="no_handphone"
                          value={users.no_handphone}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  no_handphone: ev.target.value
                              })
                          }
                          placeholder='No. Handphone'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* no handphone */}
                  {/* nim */}
                  <div>
                      <label htmlFor="nim" className='block text-sm font-medium text-gray-700'>Nim</label>
                      <input
                          type="text"
                          name="nim"
                          id="nim"
                          value={users.nim}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  nim: ev.target.value
                              })
                          }
                          placeholder='Nim'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* nim */}
                  {/* email */}
                  <div>
                      <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email Address</label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          value={users.email}
                          onChange={(ev) => 
                              setUsers({
                                  ...users,
                                  email: ev.target.value
                              })
                          }
                          placeholder='Email'
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                      />
                  </div>
                  {/* email */}
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
