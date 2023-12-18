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

export default function UsersList() {
  const {showToast} = useStateContext();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false)

  const onDeleteClick = (id) => {
      if (window.confirm('Are you sure you want delete this user?')) {
          axiosClient.delete(`/users/${id}`).then(() => {
              getUsers()
              showToast('Peminjam berhasil dihapus')
          })
      }
  }
  
  const onPageClick = (link) => {
        getUsers(link.url)
    }

  const getUsers = (url)  => {
      url = url || '/users'
      setLoading(true)
      axiosClient.get(url)
          .then(({data}) => {
              setUsers(data.data)
              setMeta(data.meta)
              setLoading(false)
          })
  }

  useEffect(() => {
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
                  key="nama"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nama
                  </Typography>
                </th>
                <th
                  key="alamat"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Alamat
                  </Typography>
                </th>
                <th
                  key="telp"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    No Handphone
                  </Typography>
                </th>
                <th
                  key="nim"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nim
                  </Typography>
                </th>
                <th
                  key="email"
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Email
                  </Typography>
                </th>

              {/* {users && users.length > 0 && Object.keys(users[0]).slice(1, -2).map((attribute) => (
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
            {users.map(({attribute}, index) =>{
              const isLast = index === users.length - 1;
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
                      {users[index].name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {users[index].alamat}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <a href={`mailto:${users[index].no_handphone}`} className="text-blue-500 hover:text-blue-700">
                      Telp
                      </a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {users[index].nim}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <a href={`mailto:${users[index].email}`} className="text-blue-500 hover:text-blue-700">
                      Send Email
                      </a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className='flex items-center'>
                      <TButton to={`/users/${users[index].id}` } circle link color='gray'>
                          <PencilIcon className='w-5 h-5' />
                      </TButton>

                      {users[index].id && (
                          <TButton onClick={ev => onDeleteClick(users[index].id)} circle link color='red'>
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
        {users.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick}/>}
      </CardFooter>
    </Card>
  );
}

// perbaiki card footer
