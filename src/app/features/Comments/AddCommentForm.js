import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import CommentService from '../../../services/comment.service';

function AddCommentForm(props) {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState('');

  const handleSubmitComment = () => {
    CommentService.createComment(
      user.userData.id,
      props.itemId,
      text,
      props.parentCommentId,
      user.token
    ).then(
      (data) => {
        console.log(data);
        props.commentsReloading();
        setText('');
      },
      (error) => {
        console.log(error.response);
      }
    );
  };

  return (
    <div {...props}>
      <TextField
        id='outlined-multiline-static'
        label='Dodaj komentarz'
        multiline
        fullWidth
        rows={4}
        variant='outlined'
        value={text}
        onChange={(value) => {
          setText(value.target.value);
        }}
      />
      <div className='panel'>
        <div className='comment_as'>
          Komentujesz jako <strong>{user.userData.name}</strong>
        </div>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleSubmitComment}
        >
          Wyślij
        </Button>
      </div>
    </div>
  );
}

export default AddCommentForm = styled(AddCommentForm)`
  .panel {
    display: flex;
    align-items: center;
    padding: 8px;

    .comment_as {
      font-size: 14px;
      color: 000;
      margin-right: 8px;

      .username {
        display: inline-block;
        color: #000;
      }
    }
  }
`;
