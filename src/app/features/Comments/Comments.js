import React, { useState, createContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import CommentService from '../../../services/comment.service';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import BestComment from './BestComment';

export const CommentContext = createContext({});

const Comments = ({ itemId, commentsCount }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [replying, setReplying] = useState([]);
  const [commentsReloading, setCommentsReloading] = useState(0);

  useEffect(() => {
    const unflatten = (data) => {
      const tree = data
        .map((e) => ({ ...e }))
        .sort((a, b) => a.comment_id - b.comment_id)
        .reduce((a, e) => {
          a[e.comment_id] = a[e.comment_id] || e;
          a[e.parentCommentId] = a[e.parentCommentId] || {};
          const parent = a[e.parentCommentId];
          parent.comments = parent.comments || [];
          parent.comments.push(e);

          return a;
        }, {});
      return Object.values(tree).find((e) => e.comment_id === undefined)
        .comments;
    };

    const fetchComments = () => {
      CommentService.getComments(itemId).then(
        (data) => {
          setFetchedComments(unflatten(data.comments));
          setLoading(false);

          if (commentsReloading > 0) {
            document
              .getElementById(commentsReloading)
              .scrollIntoView({ behavior: 'smooth' });
          }
        },
        () => {
          setLoading(false);
        }
      );
    };

    fetchComments();
  }, [commentsReloading, itemId]);

  const handleCommentsReloading = (newCommentId) => {
    setCommentsReloading(newCommentId);
  };

  return (
    <StyledPaper id='comments' elevation={0}>
      <Typography variant='h6' gutterBottom component='h4'>
        Komentarze ({commentsCount})
      </Typography>
      {!isLoggedIn ? (
        <Typography variant='subtitle1' gutterBottom>
          Zaloguj się aby dodawać komentarze
        </Typography>
      ) : (
        <AddCommentForm
          itemId={itemId}
          parentCommentId={null}
          commentsReloading={handleCommentsReloading}
          handleCancelClick={false}
        />
      )}
      {loading ? (
        'Loading...'
      ) : (
        <>
          {fetchedComments.length !== 0 ? (
            <CommentContext.Provider value={[replying, setReplying]}>
              <BestComment
                comments={fetchedComments}
                commentsReloading={handleCommentsReloading}
              />
              <Typography variant='h6' gutterBottom component='h4'>
                Wszystkie
              </Typography>
              <List>
                {fetchedComments.map((comment, i) => {
                  return (
                    <Comment
                      key={i}
                      comment={comment}
                      commentsReloading={handleCommentsReloading}
                      path={[...[], i]}
                    />
                  );
                })}
              </List>
            </CommentContext.Provider>
          ) : (
            <Typography variant='body2' align='center' component='h4'>
              Brak komentarzy.
            </Typography>
          )}
        </>
      )}
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  padding: 15px;
`;

export default Comments;
