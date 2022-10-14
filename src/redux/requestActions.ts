import { createAsyncThunk } from '@reduxjs/toolkit';
import { defaultCountry, setSpinner } from './slice';
import { country } from './types';

export const getCountries = createAsyncThunk('countries/getAll', async (payload, thunkAPI) => {
    thunkAPI.dispatch(setSpinner(true));
    try {
        const response = await fetch('https://restcountries.com/v3/all?fields=name,capital,region,population,cca2');

        thunkAPI.dispatch(setSpinner(false));
        return await response.json();
    }catch(e) {
        thunkAPI.dispatch(setSpinner(false));
        return []
    }
})

export const filterCountryByName = createAsyncThunk('countries/getCountriesByName', async (name: string|null, thunkAPI) => {
    thunkAPI.dispatch(setSpinner(true));
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const originalData = await response.json();

        thunkAPI.dispatch(setSpinner(false));

        return originalData.map((e: country) => {
            const { capital, name, population, region, cca2 } = e;

            return {
                capital,
                name,
                population,
                region,
                cca2
            }
        });
    } catch(e) {
        thunkAPI.dispatch(setSpinner(false));
        return [];
    }
})

export const filterCountryByRegion = createAsyncThunk('countries/getCountriesByRegion', async (region: string, thunkAPI) => {
    thunkAPI.dispatch(setSpinner(true));
    try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        const originalData = await response.json();

        thunkAPI.dispatch(setSpinner(false));

        return originalData.map((e: country) => {
            const { capital, name, population, region, cca2 } = e;

            return {
                capital,
                name,
                population,
                region,
                cca2
            }
        });
    } catch(e) {
        thunkAPI.dispatch(setSpinner(false));
        return [];
    }
})

export const getCountriesByCode = async (code: string) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)

    return response.json()
};

export const getCountryByFullname = createAsyncThunk('countries/getCountry', async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setSpinner(true));
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

        const jsonData = await response.json();
        const countryData = jsonData[0];
        const { borders } = countryData;
        let borderCountries = []

        if (borders && borders.length > 0) {
            const requests = borders.map((b: string) => getCountriesByCode(b))
            const borderCountriesList = await Promise.all(requests);

            borderCountries = borderCountriesList.map(c => c[0].name.common)
        }

        thunkAPI.dispatch(setSpinner(false));

        return {
            ...countryData,
            borders: borderCountries
        }
    }catch(e) {
        thunkAPI.dispatch(setSpinner(false));
        console.error(e)
        return defaultCountry
    }
})