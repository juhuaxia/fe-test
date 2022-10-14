import { createSlice } from '@reduxjs/toolkit';
import { getCountries, filterCountryByName, filterCountryByRegion, getCountryByFullname } from './requestActions';
import { country, countryDetail } from './types';

export const defaultCountry:countryDetail = {
    tld: [''],
    region: '',
    subregion: '',
    languages: {
        zho: ''
    },
    cca2: '',
    population: 0,
    capital: [''],
    name: {
        common: '',
        official: '',
        nativeName: {
            zho:{
                common: '',
                official: ''
            }
        },
    },
    currencies: {
        key: {
            name: '',
            symbol: ''
        }
    },
    borders: ['']
}

const getCountriesByPageIndex = (pageIndex: number = 0, total: Array<any> =[], pageSize: number = 20) => {
    return total.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
}

const countrySlice = createSlice({
  name: 'countryList',
  initialState: {
        pageIndex: 0 as number,
        allCountries: [] as Array<country>,
        currentCountries: [] as Array<country>,
        country: defaultCountry as countryDetail,
        spinnerStatus: false as boolean,
  },
  reducers: {
        getCountriesByPage: (state) => {
            state.pageIndex += 1;
            const countries = getCountriesByPageIndex(state.pageIndex, state.allCountries, 20)

            state.currentCountries = [...state.currentCountries, ...countries];
        },
        resetCoutry: (state) => {
            state.country = defaultCountry;
        },
        resetCountries: (state) => {
            state.pageIndex = 0;
            state.allCountries = [];
            state.currentCountries = [];
        },
        setSpinner: (state, action) => {
            state.spinnerStatus = action.payload;
        }
  },
  extraReducers: {
        // @ts-ignore
        [getCountries.fulfilled](state, action: { payload: Array<country> }) {
            state.allCountries = action.payload;
            const countries = getCountriesByPageIndex(0, action.payload, 20)
            state.pageIndex = 0;
            state.currentCountries = countries;
        },
        // @ts-ignore
        [filterCountryByName.fulfilled](state, action: { payload: Array<country> }) {
            state.allCountries = action.payload;
            const countries = getCountriesByPageIndex(0, action.payload, 20)
            state.pageIndex = 0;
            state.currentCountries = countries;
        },
        // @ts-ignore
        [filterCountryByRegion.fulfilled](state, action: { payload: Array<country> }) {
            state.allCountries = action.payload;
            const countries = getCountriesByPageIndex(0, action.payload, 20)
            state.pageIndex = 0;
            state.currentCountries = countries;
        },
        // @ts-ignore
        [getCountryByFullname.fulfilled](state, action: { payload: countryDetail }) {
            state.country = action.payload;
        }
  }
})

export const { getCountriesByPage, resetCoutry, resetCountries, setSpinner } = countrySlice.actions;
export default countrySlice.reducer;