import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { getCountriesByPage } from '../redux/slice';

const useScrollEvent = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleScroll = useCallback(() => {
        const winHeight = document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;

        if (winHeight + scrollTop >= scrollHeight) {
            dispatch(getCountriesByPage());
        }
    }, [dispatch])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)

        return () => document.removeEventListener('scroll', handleScroll)
    }, [dispatch, handleScroll])
}

export default useScrollEvent;
