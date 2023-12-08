import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    books: [],
    setCurrentUser: () => {},
    setUserToken: () => {}
});

const tmpBooks = [
    {
        id: 1,
        name: 'aaa',
        description: 'bbb',
        penerbit: 'ccc',	
        tanggal_terbit: '12-07-2002',	
        stock: 10,
        img:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: '12-07-2002',
        updated_at: '12-07-2002',
    },
    {
        id: 2,
        name: 'aaa',
        description: 'bbb',
        penerbit: 'ccc',	
        tanggal_terbit: '12-07-2002',	
        stock: 10,
        img:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: '12-07-2002',
        updated_at: '12-07-2002',
    },
    {
        id: 3,
        name: 'aaa',
        description: 'bbb',
        penerbit: 'ccc',	
        tanggal_terbit: '12-07-2002',	
        stock: 10,
        img:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        created_at: '12-07-2002',
        updated_at: '12-07-2002',
    },

]

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '')
    const [books, setBooks] = useState(tmpBooks)

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
    }

    return (
        <StateContext.Provider value={{ 
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            books
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)