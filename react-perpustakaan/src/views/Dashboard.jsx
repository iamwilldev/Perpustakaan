import { useEffect, useState } from "react";
import axiosClient from '../axios';
import PageComponent from "../components/PageComponent";
import Select from "react-tailwindcss-select";
import { useStateContext } from "../context/ContextProvider";

export default function Dashboard() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)

    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

    const getBooks = (url)  => {
        url = url || '/buku?all=true'
        setLoading(true)
        axiosClient.get(url)
            .then(({data}) => {
                setBooks(data.data)
                setLoading(false)
            })
        }

    const options = [
        {
            label: "Mammal",
            options: [
                { value: "Dolphin", label: "🐬 Dolphin" },
                { value: "Giraffe", label: "🦒 Giraffe" }
            ]
        },
        {
            label: "Carnivore",
            options: [
                { value: "Tiger", label: "🐅 Tiger" },
                { value: "Lion", label: "🦁 Lion" }
            ]
        },
        // 👉 You can put the grouped and ungrouped options together
        { value: "Zombie", label: "🧟 Zombie" }
    ];

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <PageComponent title="Dashboard">
            {/* Buku */}
            <div className='col-span-6 sm:col-span-3'>
                <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">Buku</label>
                
                <Select
                    value={animal}
                    onChange={handleChange}
                    options={options}
                    isMultiple={true}
                    formatGroupLabel={data => (
                        <div className={`py-2 text-xs flex items-center justify-between`}>
                            // 👉 data represents each subgroup
                            <span className="font-bold">{data.label}</span>
                            <span className="bg-gray-200 h-5 h-5 p-1.5 flex items-center justify-center rounded-full">
                                {data.options.length}
                            </span>
                        </div>
                    )}
                />
            </div>
        </PageComponent>
    )
}
