import Signup from './Signup';
import Login from './Login';
import Homepage from './Home/Homepage';
import Notfound from './Home/Notfound';
import ViewPro from './components/Products/ViewPro';
import Cart from './components/AddtoCart/Cart';
import Admin from './components/Admin/Admin';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/Signin" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/productDetails/:productId" element={<ViewPro />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Cart/:userId" element={<Cart /> }/>
        <Route path="/Admin/:userId" element={<Admin /> }/>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;