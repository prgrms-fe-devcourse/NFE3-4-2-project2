import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import devAPI from '@/config/axiosDevConfig';

function App() {
  useAxiosInterceptor(devAPI);
  return <RouterProvider router={router} />;
}

export default App;
