import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CommentService from '../../../services/comment.service';
import { useSelector } from 'react-redux';

const RatingComment = ({ commentId, votes, votesCount }) => {
  const { user } = useSelector((state) => state.auth);
  const [commentVotes, setCommentVotes] = useState(votes);
  const [commentVotesCount, setCommentVotesCount] = useState(votesCount);

  const userId = user ? user.userData.id : null;
  const authToken = user ? user.token : null;

  const handleVoteClick = (mode) => {
    let count = 0;

    if (mode === 'up') {
      count = 1;
    } else if (mode === 'down') {
      count = -1;
    }

    CommentService.commentVote(commentId, mode, userId, authToken).then(
      (response) => {
        let count = 0;

        if (mode === 'up') {
          count = 1;
        } else if (mode === 'down') {
          count = -1;
        }

        setCommentVotes(votes + count);
        setCommentVotesCount(votesCount + 1);

        console.log(response);
      },
      (error) => {
        console.log(error.response);
      }
    );
  };

  return (
    <VotingWrapper>
      <VotingIcon voteaction='plus' onClick={() => handleVoteClick('up')}>
        <AddBoxIcon fontSize='small' />
      </VotingIcon>
      <VotesStatus>
        {commentVotes > 0 ? '+' + commentVotes : commentVotes}
        <span>({commentVotesCount})</span>
      </VotesStatus>
      <VotingIcon voteaction='down' onClick={() => handleVoteClick('down')}>
        <IndeterminateCheckBoxIcon fontSize='small' />
      </VotingIcon>
    </VotingWrapper>
  );
};

const VotingIcon = styled(IconButton)`
  padding: 0;

  ${({ voteaction, theme }) =>
    voteaction &&
    `
    color: ${voteaction === 'plus' ? `#4caf50` : theme.palette.secondary.main};

  `}
`;

const VotingWrapper = styled.div`
  display: flex;
  margin-top: 6px;
`;

const VotesStatus = styled.div`
  margin: 0 2px;

  span {
    padding-left: 2px;
    color: #a5a5a5;
  }
`;

export default RatingComment;
