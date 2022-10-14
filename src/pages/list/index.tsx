import Styles from './index.module.scss';
import OutlinedInput, {  } from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useMemo, useState } from 'react';
import CountryItem from '../../components/countryItem';
import { useScrollEvent, useSearch, useFilterRegion } from '../../hooks';
import { regionList } from '../../utils/constant';
import debounce from 'lodash/debounce';
import {useNavigate} from 'react-router-dom';
import { resetCoutry } from '../../redux/slice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';

const ListPage = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [region, setRegion] = useState<string>('');
    const [searchKeys, setSearchKeys] = useState<string | null>(null);
    useScrollEvent();
    useSearch(searchKeys);
    useFilterRegion(region);
    const { currentCountries } = useSelector((state: RootState) => state.countries);
    const inputStyles = useMemo(() => ({
        root: Styles['input-root'],
        notchedOutline: Styles['input-contaier'],
        focused: Styles['input-focus'],
        input: Styles.input,
    }), [])
    
    const selectionStyles = useMemo(() => ({
        select: Styles['select-button'],
        icon: Styles['arrow-icon'],
        focused: Styles['input-focus'],
        notchedOutline: Styles['select-input'],
    }), [])

    const IconStyles = useMemo(() => ({
        root: Styles['search-icon-color'],
    }), [])

    const selectItemStyles = useMemo(() => ({
        root: Styles['select-item']
    }), [])

    const handleRegionChange = useCallback((event: SelectChangeEvent<typeof region>) => {
        setRegion(event.target.value);
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearchInput = useCallback(debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeys(event.target.value);
    }, 500), [])

    const handleCountryClick = useCallback((name: string) => {
        dispatch(resetCoutry())
        navigate(`/detail/${name}`)
    }, [dispatch, navigate])

    const menuItems = useMemo(() => regionList.map((item, i) => {
        const { val, text } = item;

        return <MenuItem key={i} value={val} classes={selectItemStyles}>{text}</MenuItem>
    }), [selectItemStyles])

    const countriesRender = useMemo(() => currentCountries.map(country => {
        const { capital = [''], cca2, population, region, name} = country;

        return (
            <CountryItem
                key={cca2}
                name={name.common}
                capital={capital[0]}
                flag={cca2}
                population={population}
                region={region}
                onClick={handleCountryClick}
            />
        )
    }), [currentCountries, handleCountryClick])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.toolbar}>
                <div className={Styles['search-input']}>
                    <OutlinedInput
                        fullWidth
                        classes={inputStyles}
                        placeholder="Search for a country"
                        onChange={handleSearchInput}
                        startAdornment={
                            <InputAdornment position="start">
                                <Search classes={IconStyles}/>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={Styles['select-box']}>
                    <Select
                        fullWidth
                        classes={selectionStyles}
                        value={region}
                        onChange={handleRegionChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => {
                            if (!selected) {
                            return 'Filter by Region';
                            }
                            return selected
                        }}
                    >
                        <MenuItem classes={selectItemStyles} value="">Filter by Region</MenuItem>
                        {
                            menuItems
                        }
                    </Select>
                </div>
            </div>
            <div className={Styles['list-wrapper']}>
                {
                    countriesRender
                }
            </div>
        </div>
    )
}

export default ListPage;
