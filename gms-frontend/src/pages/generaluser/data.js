import axios from "axios";

const getmonthlyjoined = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/monthlymember',{withCredentials:true});
        return response.data;
    }catch(err){
        console.error("error is : ",err);
        throw err;
    }
};

const expiringwithin3days = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/expiringwithin3days',{withCredentials:true});
        return response.data;
    }catch(err){
        console.error("error is : ",err);
        throw err;
    }
};

const expired = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/expired',{withCredentials:true});
        return response.data;
    }catch(err){
        console.error("error is : ",err);
        throw err;
    }
};

const inactive = async() => {
    try{
        const response = await axios.get('http://localhost:4000/members/inactive',{withCredentials:true});
        return response.data;
    }catch(err){
        console.error("error is : ",err);
        throw err;
    }
};

export {getmonthlyjoined,expiringwithin3days,expired,inactive};