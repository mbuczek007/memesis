import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import ItemService from '../../../services/item.service';
import styled from 'styled-components';

const ChangeStatusButton = ({
  itemId,
  isAccepted,
  itemFirstAcceptedDate,
  itemRemoved,
}) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = (status) => {
    ItemService.itemChangeStatus(
      itemId,
      itemFirstAcceptedDate,
      status,
      user.token,
      user.userData.id
    ).then(
      () => {
        itemRemoved();
      },
      (error) => {
        setErrorMessage(error.response.data.error);
      }
    );
  };

  if (!isLoggedIn) {
    return false;
  }

  return (
    <>
      <StyledButton
        size='small'
        color='secondary'
        onClick={() => {
          handleClick(!isAccepted);
        }}
        accepted={isAccepted}
      >
        {isAccepted ? '[ Usuń z głównej ]' : '[ Dodaj na główną ]'}
      </StyledButton>
      {errorMessage}
    </>
  );
};

const StyledButton = styled(Button)`
  color: ${({ accepted }) =>
    `
    ${accepted ? 'red' : 'green'};
  `};
`;

export default ChangeStatusButton;
