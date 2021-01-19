import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import CommentService from '../../../services/comment.service';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import ButtonLoading from '../../shared/ButtonLoading/ButtonLoading';

const AddCommentForm = ({
  itemId,
  parentCommentId,
  commentsReloading,
  handleCancelClick,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setMessage] = useState(null);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null);

    CommentService.createComment(
      user.userData.id,
      itemId,
      text,
      parentCommentId,
      user.token
    ).then(
      (data) => {
        setText('');
        setIsLoading(false);
        commentsReloading(data.newCommentId);
      },
      (error) => {
        setIsLoading(false);
        setMessage(error.response.data.error);
      }
    );
  };

  return (
    <AddCommentWrapper>
      {errorMessage && (
        <StyledAlert variant='outlined' severity='error'>
          {errorMessage}
        </StyledAlert>
      )}
      <form onSubmit={handleSubmitComment}>
        <TextField
          required
          id='outlined-multiline-static'
          label='Dodaj komentarz'
          autoFocus={parentCommentId !== null}
          multiline
          fullWidth
          rows={4}
          variant='outlined'
          value={text}
          disabled={isLoading}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <AddCommentActions>
          <CommentUserInfo variant='body2'>
            Komentujesz jako <span>{user.userData.name}</span>
          </CommentUserInfo>
          <ButtonWrapper>
            <ButtonLoading
              ctaText='Wyślij'
              loading={isLoading}
              isDisabled={false}
            />
            {parentCommentId !== null && (
              <Button disabled={isLoading} onClick={handleCancelClick}>
                Anuluj
              </Button>
            )}
          </ButtonWrapper>
        </AddCommentActions>
      </form>
    </AddCommentWrapper>
  );
};

const AddCommentWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const AddCommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 0 15px;
`;

const CommentUserInfo = styled(Typography)`
  span {
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 0;
  }

  > button {
    margin-left: 10px;
  }
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 15px;
`;

export default AddCommentForm;
