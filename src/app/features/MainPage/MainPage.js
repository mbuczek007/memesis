import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FacebookLoginButton from '../../shared/FacebookLoginButton/FacebookLoginButton';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { logIn, logOut } from '../../store/reducers/authSlice';

const MainPage = () => {
  const userToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <div>
      <PageTitle title='Główna' />
      Main Page
      <ul>
        <li>
          <Link to='/view/21'>Item 21</Link>
        </li>
        <li>
          <Link to='/view/22'>Item 22</Link>
        </li>
        <li>
          <Link to='/view/23'>Item 23</Link>
        </li>
      </ul>
      {userToken ? (
        <button onClick={() => dispatch(logOut())}>Logout</button>
      ) : (
        <FacebookLoginButton onHandleClick={() => dispatch(logIn())} />
      )}
    </div>
  );
};

export default MainPage;
