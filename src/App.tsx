import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListPage from './pages/list';
import DetailPage from './pages/detail';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/detail/:name' element={<DetailPage/>}/>
            <Route path='/' element={<ListPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}
