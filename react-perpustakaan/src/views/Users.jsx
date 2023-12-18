import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios";
import UsersList from "../components/UsersList";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import PaginationLinks from "../components/PaginationLinks";
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

export default function Users() {
    const {showToast} = useStateContext();
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false)

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
        <PageComponent title="Peminjam" buttons={(
            <TButton color="green" to="/users/create">
                <PlusCircleIcon className="h-6 w-6 mr-2" /> Tambah Peminjam
            </TButton>
        )}>
            { loading && <div className="text-center text-lg"> Loading... </div>}
            { !loading && (
                <div>
                    {users.length === 0 && <div className="py-8 text-center text-gray-700">Tidak ada peminjam tersimpan</div>}
                    {users.length >= 1 && 
                        <div className="px-8">
                            <UsersList users={users} key={users.id}/>
                        </div>
                    }
                </div>
            )}
        </PageComponent>
    )
}
