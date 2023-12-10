import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import PaginationLinks from "./PaginationLinks";
import { useStateContext } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import TButton from "./core/TButton";

export default function PeminjamanList() {
  const {showToast} = useStateContext();
  const [peminjaman, setPeminjaman] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false)

  const onDeleteClick = (id) => {
      if (window.confirm('Are you sure you want delete this peminjaman?')) {
          // hapus data peminjaman dan detail peminjaman
          axiosClient.delete(`/peminjaman/${id}`).then(() => {
              getPeminjaman()
              showToast('Peminjaman berhasil dihapus')
          })
      }
  }
  
  const onPageClick = (link) => {
        getPeminjaman(link.url)
    }

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

  const getBooks = (url)  => {
        url = url || '/buku'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setBooks(data.data)
                setLoading(false)
            })
    }

  const getUsers = async (url = '/users') => {
    setLoading(true);

    try {
      let currentPage = 1;
      let allUsers = [];

      while (true) {
        const response = await axiosClient.get(`${url}?page=${currentPage}`);
        const { data } = response;

        const newUsers = data.data;
        allUsers = [...allUsers, ...newUsers];

        if (
          data.meta.current_page < data.meta.last_page
        ) {
          currentPage++;
        } else {
          // All pages have been fetched
          setUsers(allUsers);
          setLoading(false);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
        getPeminjaman()
        getBooks()
        getUsers()
    }, [])

  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th
                key="no"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  No.
                </Typography>
              </th>
              <th
                key="no"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Nama Peminjam
                </Typography>
              </th>
              <th
                key="no"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Buku yang dipinjam
                </Typography>
              </th>
              {/* </th>

              {peminjaman && peminjaman.length > 0 && Object.keys(peminjaman[0]).slice(1, -2).map((attribute) => (
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {attribute}
                  </Typography>
                </th>
              ))} */}
              <th
                  key="action"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Action
                  </Typography>
                </th>
            </tr>
          </thead>
          <tbody>
            {peminjaman.map((attribute, index) =>{
              const isLast = index === peminjaman.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              // find user
              const user = users.find((user) => user.id === attribute.user_id);
 
              return (
                <tr>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1 + (meta.current_page - 1) * meta.per_page}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {user ? user.name : 'Unknown User'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {peminjaman[index].detail_peminjaman.map((detail, detailIndex) => {
      
                        const book = books.find((book) => book.id === detail.books_id);

                        return (
                          <ul role="list" className="divide-y divide-gray-100" key={detailIndex}>
                            <li key={detail.id} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5">
                              <div className="flex min-w-0 gap-x-4">
                                <img
                                  className="h-12 w-12 flex-none bg-gray-50"
                                  src={book ? book.img_url : 'https://images.unsplash.com/photo-1612837017953-4b6b7a3f0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVrdSUyMGJvb2slMjBzdG9ja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
                                  alt=""
                                />
                                <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">{book ? book.name : 'Unknown Book'}</p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{book ? book.penerbit : 'Unknown Penerbit'}</p>
                                </div>
                              </div>
                              <div className="mt-4 sm:mt-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-xs leading-5 text-gray-500">Tanggal Pengembalian: {detail.tgl_kembali}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">Tanggal Peminjaman: {detail.tgl_peminjaman}</p>
                              </div>
                            </li>
                          </ul>
                        );
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className='flex items-center'>
                      <TButton to={`/peminjaman/${peminjaman[index].id}` } circle link color='gray'>
                          <PencilIcon className='w-5 h-5' />
                      </TButton>

                      {peminjaman[index].id && (
                          <TButton onClick={ev => onDeleteClick(peminjaman[index].id)} circle link color='red'>
                              <TrashIcon className='w-5 h-5' />
                          </TButton>
                          
                        )}
                    </div>
                  </td>
                </tr>
              );
            },)}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {peminjaman.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick}/>}
      </CardFooter>
    </Card>
  );
}
