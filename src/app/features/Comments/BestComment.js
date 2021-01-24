import React from 'react';
import Comment from './Comment';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const BestComment = ({ comments, commentsReloading }) => {
  const pullBestComment = () => {
    const deepCopyComments = JSON.parse(JSON.stringify(comments));

    return deepCopyComments.sort(
      (a, b) => parseFloat(b.votes) - parseFloat(a.votes)
    )[0];
  };

  const bestComment = pullBestComment();

  if (bestComment.votesCount < 5) {
    return null;
  }

  return (
    <BestCommentWrapper>
      <Typography variant='h6' gutterBottom component='h4'>
        Najlepszy Komentarz
      </Typography>
      <Comment
        comment={bestComment}
        commentsReloading={commentsReloading}
        path={[...[], 999999]}
      />
    </BestCommentWrapper>
  );
};

const BestCommentWrapper = styled.div`
  margin-bottom: 20px;
`;

export default BestComment;
