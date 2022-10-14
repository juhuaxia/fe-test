import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { getCountryByFullname } from '../redux/requestActions';

const useGetCountry = (name?: string) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (name) {
            dispatch(getCountryByFullname(name))
        }
    }, [dispatch, name])
};

export default useGetCountry;
