import {
    useParams
} from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Styles from './index.module.scss';
import { useGetCountry, useResetScroll } from '../../hooks';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { useCallback, useMemo } from "react";
import classNames from "classnames";
import { resetCountries } from '../../redux/slice';
import { formatNumber } from '../../utils/common';

const DetailPage = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    let { name } = useParams();

    useGetCountry(name);
    useResetScroll();
    const { country } = useSelector((state: RootState) => state.countries);
    const {tld = [], region, subregion, cca2 = '', population, capital, borders, name:choutryName} = country;
    const {currencies, nativeName, language} = useMemo(() => {
        if (country.currencies) {
            const ck = Object.values(country.currencies)[0];
            const nk = Object.values(country.name.nativeName);
            const lk = Object.values(country.languages);
            return {
                currencies: ck.name,
                nativeName: nk ? nk[0].common : '',
                language: lk ? (typeof lk[0] === 'string' ? lk.join(', ') : Object.values(lk).join(', ')) as string : '',
            }
        }

        return {
            currencies: '',
            nativeName: '',
            language: ''
        };
    }, [country])

    const flagClass = useMemo(() => classNames(
        Styles['flag-img'],
        `fi fi-${cca2.toLowerCase()}`
    ), [cca2]);

    const backButtonStyles = useMemo(() => ({
        root :Styles['back_button']
    }), [])

    const arrowBackIconStyles = useMemo(() => ({
        root :Styles['array_back']
    }), [])

    const handleBackClick = useCallback(() => {
        dispatch(resetCountries())
        navigate(-1)
    }, [dispatch, navigate])

    const handleBorderCountryClick = useCallback((name: string) => {
        navigate(`/detail/${name}`)
    }, [navigate])

    const borderCountries = useMemo(() => borders.map((b,i) => <div key={i} className={Styles.border} onClick={() => handleBorderCountryClick(b)}>{b}</div>), [borders, handleBorderCountryClick])

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.toolbar}>
                <Button variant="outlined"
                classes={backButtonStyles}
                startIcon={
                    <ArrowBack
                        classes={arrowBackIconStyles}
                    />
                } onClick={handleBackClick}>
                    Back
                </Button>
            </div>
            <div className={Styles.detail}>
                <div className={Styles.flag}>
                    <div className={flagClass}></div>
                </div>
                <div className={Styles.info}>
                    <div className={Styles['country-name']}>{choutryName.common}</div>
                    <div className={Styles.grid}>
                        <div className={Styles.row}>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Native Name:</div>
                                <div className={Styles.text}>{nativeName}</div>
                            </div>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Top Level Domain:</div>
                                <div className={Styles.text}>{tld[0]}</div>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Population:</div>
                                <div className={Styles.text}>{formatNumber(population)}</div>
                            </div>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Currencies:</div>
                                <div className={Styles.text}>{currencies}</div>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Region:</div>
                                <div className={Styles.text}>{region}</div>
                            </div>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Languages:</div>
                                <div className={Styles.text}>{language}</div>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Sub Region:</div>
                                <div className={Styles.text}>{subregion}</div>
                            </div>
                        </div>
                        <div className={Styles.row}>
                            <div className={Styles.cell}>
                                <div className={Styles.label}>Capital:</div>
                                <div className={Styles.text}>{capital}</div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.borders}>
                        <div className={Styles.label}>Broder Countries:</div>
                        <div className={Styles['border-list']}>
                        {
                            borderCountries
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;
