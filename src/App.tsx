import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Discord/LoginPage/Login';
import Register from './Discord/LoginPage/Register';
import UserPage from './Discord/User/UserPage';
import ForgotPassword from './Discord/LoginPage/ForgotPassword';
import ChannelPage from './Discord/Channel/ChannelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path="/UserPage" element={<UserPage />} />        
        <Route path="/ChannelPage" element={<ChannelPage />} />
      </Routes>
    </Router>
  );
}

export default App;