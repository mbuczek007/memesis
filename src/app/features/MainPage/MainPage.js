import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLoginButton from '../../shared/FacebookLoginButton/FacebookLoginButton';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { useAuthContext } from '../../store/reducers/auth';

const MainPage = () => {
  const { user, logIn, logOut } = useAuthContext();

  console.log(user);

  return (
    <>
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
      {!user.loading && (
        <>
          {user.token ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <FacebookLoginButton onHandleClick={logIn} />
          )}
        </>
      )}
    </>
  );
};

export default MainPage;
