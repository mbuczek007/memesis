import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import ItemService from '../../../services/item.service';

const ChangeStatusButton = ({ itemId, isAccepted, itemFirstAcceptedDate }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [localIsAccepted, setLocalIsAccepted] = useState(isAccepted);
  const [message, setMessage] = useState('');

  const handleClick = (status) => {
    ItemService.itemChangeStatus(
      itemId,
      itemFirstAcceptedDate,
      status,
      user.token,
      user.userData.id
    ).then(
      (response) => {
        setLocalIsAccepted(response.data.isAccepted);
        setMessage(
          response.data.isAccepted ? 'Dodano na główną' : 'Usunięto z głównej'
        );
      },
      (error) => {
        setMessage(error.response.data.error);
      }
    );
  };

  if (!isLoggedIn) {
    return false;
  }

  return (
    <>
      <Button
        size='small'
        variant='outlined'
        color='secondary'
        onClick={() => {
          handleClick(!localIsAccepted);
        }}
      >
        {localIsAccepted ? 'Usuń z głównej' : 'Dodaj na główną'}
      </Button>
      {message}
    </>
  );
};

export default ChangeStatusButton;
