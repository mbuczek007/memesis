import React from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';

const Comment = ({ comments }) => {
  return (
    <StyledList>
      {comments.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem alignItems='flex-start'>
              <StyledListItemText
                primary={
                  <>
                    <CommentHeading
                      variant='subtitle2'
                      component='h4'
                      gutterBottom
                    >
                      {comment.email} -
                      <span>
                        {moment('2020-12-27T17:48:20.271+00:00').fromNow()}
                      </span>
                    </CommentHeading>
                  </>
                }
                secondary={comment.body}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </StyledList>
  );
};

const StyledList = styled(List)`
  width: 100%;
  padding: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StyledListItemText = styled(ListItemText)`
  margin: 6px 0 20px;
`;

const CommentHeading = styled(Typography)`
  margin-bottom: 12px;
  margin-top: 2px;

  span {
    font-weight: 400;
    font-size: 12px;
    color: #6c6c6c;
  }
`;

export default Comment;
