import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import Styles from './index.module.scss';
import { formatNumber } from '../../utils/common';

interface IProps {
    capital: string;
    flag: string;
    name: string;
    population: number;
    region: string;
    onClick: (name: string) => void;
}

const CountryItem = ({
    capital,
    flag,
    name,
    population,
    region,
    onClick,
}: IProps) => {
    const flagClass = useMemo(() => classNames(
        Styles['flag-img'],
        `fi fi-${flag.toLowerCase()}`
    ), [flag])

    const handleClick = useCallback(() => {
        if (typeof onClick === 'function') {
            onClick(name);
        }
    }, [name, onClick])

    return (
        <div className={Styles.wrapper} onClick={handleClick}>
            <div className={Styles.inner}>
                <div className={Styles.flag}>
                    <div className={flagClass}></div>
                </div>
                <div className={Styles.info}>
                    <div className={Styles['country-name']}>{name}</div>
                    <div className={Styles['country-filed']}>
                        <div className={Styles.label}>Population:</div>
                        <div className={Styles.text}>{formatNumber(population)}</div>
                    </div>
                    <div className={Styles['country-filed']}>
                        <div className={Styles.label}>region:</div>
                        <div className={Styles.text}>{region}</div>
                    </div>
                    <div className={Styles['country-filed']}>
                    <   div className={Styles.label}>capital:</div>
                        <div className={Styles.text}>{capital}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CountryItem;
