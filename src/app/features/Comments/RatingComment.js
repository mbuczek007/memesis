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
  const [commentVoteMessage, setCommentVoteMessage] = useState(null);
  const [commentVoteSuccess, setCommentVoteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = user ? user.userData.id : null;
  const authToken = user ? user.token : null;

  const resetState = () => {
    setCommentVoteMessage(null);
    setCommentVoteSuccess(false);
    setLoading(false);
  };

  const handleVoteClick = (mode) => {
    setLoading(true);

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

        setCommentVoteMessage(response.message);
        setCommentVoteSuccess(true);

        setTimeout(() => {
          resetState();
        }, 1000);
      },
      (error) => {
        if (error.response.status === 401) {
          setCommentVoteMessage('Zaloguj się');
        } else {
          setCommentVoteMessage(error.response.data.error);
        }

        setCommentVoteSuccess(false);

        setTimeout(() => {
          resetState();
        }, 1200);
      }
    );
  };

  return (
    <VotingWrapper>
      <VotingIcon
        disabled={loading}
        voteaction='plus'
        onClick={() => handleVoteClick('up')}
      >
        <AddBoxIcon fontSize='small' />
      </VotingIcon>
      <VotesStatus>
        {commentVotes > 0 ? '+' + commentVotes : commentVotes}
        <span>({commentVotesCount})</span>
      </VotesStatus>
      <VotingIcon
        disabled={loading}
        voteaction='down'
        onClick={() => handleVoteClick('down')}
      >
        <IndeterminateCheckBoxIcon fontSize='small' />
      </VotingIcon>
      <StyledVoteMessage issuccess={commentVoteSuccess ? 1 : 0}>
        {commentVoteMessage}
      </StyledVoteMessage>
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
  position: relative;
`;

const VotesStatus = styled.div`
  margin: 0 2px;

  span {
    padding-left: 2px;
    color: #a5a5a5;
  }
`;

const StyledVoteMessage = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: 12px;
  text-align: right;
  top: 24px;
  width: 122px;
  right: 0;
  color: ${({ issuccess }) =>
    `
    ${issuccess ? 'green' : 'red'};

  `};
`;

export default RatingComment;
