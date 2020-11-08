import { useSelector } from 'react-redux';

const useAuth = () => {
  const isLogIn = useSelector((state) => state.auth.token) !== null;
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth);

  return { isLogIn, loading, user };
};

export default useAuth;
