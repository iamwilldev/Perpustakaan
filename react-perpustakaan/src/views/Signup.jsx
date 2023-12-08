import { Link } from "react-router-dom"
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useState } from "react"
import axiosClient from "../axios.js"
import { useStateContext } from "../context/ContextProvider.jsx"

export default function Signup() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_handphone, setNo_Handphone] = useState('');
  const [nim, setNim] = useState('');
  const [error, setError] = useState({__html: ''});

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({__html: ''})

    axiosClient
      .post('/signup', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        alamat,
        no_handphone,
        nim
      })
      .then(({data}) => {
        setCurrentUser(data.user)
        setUserToken(data.token)
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({__html: finalErrors.join('<br>')})
        }
      })
  }


  return (
    <>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Daftar
        </h2>

        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}

        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
                <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
                    Nama
                </label>
                <div className="mt-2">
                    <input
                    id="nama"
                    name="name"
                    type="text"
                    autoComplete="text"
                    required
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="telp" className="block text-sm font-medium leading-6 text-gray-900">
                    No. Telp
                </label>
                <div className="mt-2">
                    <input
                    id="telp"
                    name="no_handphone"
                    type="phone"
                    autoComplete="phone"
                    required
                    value={no_handphone}
                    onChange={(ev) => setNo_Handphone(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="nim" className="block text-sm font-medium leading-6 text-gray-900">
                    Nim
                </label>
                <div className="mt-2">
                    <input
                    id="nim"
                    name="nim"
                    type="text"
                    autoComplete="text"
                    required
                    value={nim}
                    onChange={(ev) => setNim(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="alamat" className="block text-sm font-medium leading-6 text-gray-900">
                    Alamat
                </label>
                <div className="mt-2">
                    <textarea
                      id="alamat"
                      name="alamat"
                      rows={3}
                      required
                      value={alamat}
                      onChange={(ev) => setAlamat(ev.target.value)}
                      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      defaultValue={''}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password-confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                    Password Confirmation
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password-confirmation"
                    name="password-confirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={passwordConfirmation}
                    onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Daftar
                </button>
            </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login
            </Link>
        </p>
    </>
  )
}
