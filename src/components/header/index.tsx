import Styles from './index.module.scss';
import classNames from 'classnames';
import { useCallback, useMemo, useRef, useState } from 'react';

const Header = () => {
    const [theme, setTheme] = useState<string>("light");
    const themeDict = useRef<Record<string, string>>({
        light: 'dark',
        dark: 'light'
    });

    const moonClass = useMemo(() => classNames(
        "fa-solid",
        "fa-moon",
        Styles['moon-icon']
    ), [])
    
    const handleChangeTheme = useCallback(() => {
        window.document.documentElement.setAttribute("data-theme", themeDict.current[theme]);
        setTheme(themeDict.current[theme])
    }, [theme])

    return (
        <div className={Styles.header}>
            <div className={Styles.title}>Where in the world?</div>
            <div className={Styles['theme-button']} onClick={handleChangeTheme}>
                <i className={moonClass}></i>
                <div className={Styles['theme-text']}>Dark Mode</div>
            </div>
        </div>
    )
}

export default Header;
