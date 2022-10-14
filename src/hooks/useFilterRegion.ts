import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { filterCountryByRegion, getCountries } from '../redux/requestActions';

const useFilterRegion = (region: string) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (region) {
            dispatch(filterCountryByRegion(region));
        } else if (region === '') {
            dispatch(getCountries());
        }
    }, [dispatch, region])
};

export default useFilterRegion;
