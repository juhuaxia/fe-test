import ReactDOM from 'react-dom/client';
import Styles from './index.module.scss';
import App from './App';
import Header from './components/header';
import reportWebVitals from './reportWebVitals';
import './styles/reset.scss';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import Spinner from './components/spinner';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className={Styles.wrapper}>
    <Provider store={store}>
      <Spinner />
      <Header />
      <App />
    </Provider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
