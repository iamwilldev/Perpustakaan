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
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false)

  const onDeleteClick = (id) => {
        if (window.confirm('Are you sure you want delete this peminjaman?')) {
            axiosClient.delete(`/peminjaman/${id}`).then(() => {
                getPeminjaman()
                showToast('Peminjaman berhasil dihapus')
            })
        }
    }

  const onPageClick = (link) => {
      getPeminjaman(link.url)
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
        getBooks()
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
              <th
                key="tgl_pinjam"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Tanggal Peminjaman
                </Typography>
              </th>
              <th
                key="tgl_kembali"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Tanggal Pengembalian
                </Typography>
              </th>
              <th
                key="sisa hari"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Sisa Hari
                </Typography>
              </th>
              <th
                key="denda"
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Denda
                </Typography>
              </th>
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
            {peminjaman.map((item, index) => {
              const isLast = index === peminjaman.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
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
                      {peminjaman[index].peminjam.name} [{peminjaman[index].peminjam.nim}]
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {peminjaman[index].details.map((detail, index) => {
                        const bookId = detail.book_id;
                        const bookIndex = books.findIndex((book) => book.id === bookId);
                        const bookName = bookIndex !== -1 ? books[bookIndex].name : 'Book not found';

                        return (
                          <div className='flex items-center' key={index}>
                            <span className='text-gray-400'>
                              {index + 1}. {bookName}
                            </span>
                          </div>
                        );
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                    >
                      {new Date(peminjaman[index].tgl_pinjam).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                    >
                      {new Date(peminjaman[index].tgl_kembali).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color={new Date() > new Date(peminjaman[index].tgl_kembali) ? "red" : "blue-gray"}
                    >
                      {new Date() > new Date(peminjaman[index].tgl_kembali)
                        ? `-${Math.abs(Math.ceil((new Date(peminjaman[index].tgl_kembali) - new Date()) / (1000 * 60 * 60 * 24)))} Hari`
                        : `${Math.ceil((new Date(peminjaman[index].tgl_kembali) - new Date()) / (1000 * 60 * 60 * 24))} Hari`}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                    >
                      {Math.ceil((new Date(peminjaman[index].tgl_kembali) - new Date()) / (1000 * 60 * 60 * 24)) > 0 ? 'Rp. 0' : `Rp. ${Math.ceil((new Date(peminjaman[index].tgl_kembali) - new Date()) / (1000 * 60 * 60 * 24)) * 1000}`}
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
        {peminjaman && peminjaman.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick}/>}
      </CardFooter>
    </Card>
  );
}
