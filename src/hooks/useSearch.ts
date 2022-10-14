import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { filterCountryByName, getCountries } from '../redux/requestActions';

const useSearch = (name: string|null) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (name === ''){
            dispatch(getCountries());
        } else if (name && name.trim() !== '') {
            dispatch(filterCountryByName(name));
        }
    }, [dispatch, name])
};

export default useSearch;
