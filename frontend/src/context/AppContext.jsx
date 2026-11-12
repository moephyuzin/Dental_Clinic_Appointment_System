import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctor] = useState([])
    const [services, setServices] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");


    const getDoctorData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success) {
                setDoctor(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getServiceData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/service/list')
            if(data.success) {
                setServices(data.services)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
       
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})

            if (data.success) {
                
                setUserData(data.userData)
            } else {
                
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors, getDoctorData,
        currencySymbol,
        token, setToken,
        backendUrl, 
        userData, setUserData,
        loadUserProfileData,
        services,
        searchTerm, setSearchTerm
    }

    useEffect(() => {
        getDoctorData()
    }, [])

    useEffect(() => {
        getServiceData()
    }, [])

    useEffect (() => {
        if (token) {
          
            loadUserProfileData()
        } else {
           
            setUserData(null)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}  
        </AppContext.Provider>
    );
}

export default AppContextProvider;
