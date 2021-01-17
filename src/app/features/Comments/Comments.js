import React, { useState, createContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';
import CommentService from '../../../services/comment.service';
import { useSelector } from 'react-redux';

export const CommentContext = createContext({});

const Comments = ({ itemId, commentsCount }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [replying, setReplying] = useState([]);
  const [fetchedComments, setFetchedComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsReloading, setCommentsReloading] = useState(true);

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
        },
        (error) => {
          console.log(error.response);
        }
      );
    };

    fetchComments();
  }, [commentsReloading]);

  const handleCommentsReloading = () => {
    setCommentsReloading(!commentsReloading);
  };

  return (
    <Paper id='comments' elevation={0}>
      <Typography variant='h6' gutterBottom component='h4'>
        Komentarze ({commentsCount})
      </Typography>
      {isLoggedIn ? (
        <AddCommentForm
          commentsReloading={handleCommentsReloading}
          itemId={itemId}
          parentCommentId={null}
        />
      ) : (
        <Typography variant='subtitle1' gutterBottom>
          Zaloguj się aby dodawać komentarze
        </Typography>
      )}

      {loading ? (
        'Loading...'
      ) : (
        <CommentContext.Provider value={[replying, setReplying]}>
          {fetchedComments.map((comment, i) => {
            return (
              <Comment
                commentsReloading={handleCommentsReloading}
                parentCommentId={comment.parentCommentId}
                itemId={comment.itemId}
                comment_id={comment.comment_id}
                username={comment.userName}
                date={comment.createdAt}
                text={comment.commentBody}
                votes={comment.votes}
                colorindex={0}
                key={i}
                path={[...[], i]}
                comments={comment.comments}
              />
            );
          })}
        </CommentContext.Provider>
      )}
    </Paper>
  );
};

export default Comments;
