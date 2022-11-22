import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
const Shop = () => {
  return (
    <h1>This is the shop page!</h1>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />{/*index=index={true}*/}
        <Route path='/shop' element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
