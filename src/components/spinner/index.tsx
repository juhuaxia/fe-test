import Styles from './index.module.scss';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';

const Spinner = () => {
    const { spinnerStatus } = useSelector((state: RootState) => state.countries);
    return spinnerStatus ? (
        <div className={Styles.wrapper}>
            <div className={Styles['lds-spinner']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    ) : null
}

export default Spinner;
