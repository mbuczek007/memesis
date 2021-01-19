import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import CommentService from '../../../services/comment.service';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

const AddCommentForm = ({
  itemId,
  parentCommentId,
  replyUserName,
  commentsReloading,
  handleCancelClick,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState(replyUserName ? '@' + replyUserName : '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.selectionStart = inputRef.current.value.length;
    inputRef.current.selectionEnd = inputRef.current.value.length;
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');

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
        <Alert variant='outlined' severity='error'>
          {errorMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmitComment}>
        <TextField
          inputRef={inputRef}
          required
          id='outlined-multiline-static'
          label='Dodaj komentarz'
          autoFocus={parentCommentId !== null}
          multiline
          fullWidth
          rows={4}
          variant='outlined'
          value={text}
          onChange={(value) => {
            setText(value.target.value);
          }}
        />
        <AddCommentActions>
          <CommentUserInfo variant='body2'>
            Komentujesz jako <span>{user.userData.name}</span>
          </CommentUserInfo>
          <div>
            <Button
              variant='contained'
              color='primary'
              disableElevation
              type='submit'
            >
              Wyślij
            </Button>
            {parentCommentId !== null && (
              <Button onClick={handleCancelClick}>Anuluj</Button>
            )}
          </div>
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

export default AddCommentForm;
