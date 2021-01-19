import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const createComment = (
  userId,
  itemId,
  commentBody,
  parentCommentId,
  authToken
) => {
  return axios
    .post(
      API_URL + 'comments/action/add',
      {
        userId,
        itemId,
        commentBody,
        parentCommentId,
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const commentVote = (commentId, voteValue, userId, authToken) => {
  return axios
    .post(
      API_URL + 'comments/action/vote',
      { commentId, voteValue, userId },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getComments = (itemId) => {
  return axios.get(API_URL + `comments/${itemId}`).then((response) => {
    return response.data;
  });
};

const CommentsService = {
  createComment,
  commentVote,
  getComments,
};

export default CommentsService;
