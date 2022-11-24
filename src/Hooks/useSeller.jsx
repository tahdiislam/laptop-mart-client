import axios from "axios";
import { useEffect, useState } from "react";

const useSeller = (email) => {
    const [loading, setLoading] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    useEffect(() => {
        if(email){
            const url = `${import.meta.env.VITE_server_url}seller?email=${email}`
            axios.get(url).then(result => {
                setIsSeller(result.data.isSeller)
                setLoading(false)
            })
        }
    },[email])
    return {isSeller, loading}
};

export default useSeller;