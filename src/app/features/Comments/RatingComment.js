import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CommentService from '../../../services/comment.service';
import { useSelector } from 'react-redux';

const RatingComment = ({ commentId, votes, votesCount }) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user ? user.userData.id : null;
  const authToken = user ? user.token : null;
  const [voteData, setVoteData] = useState({
    votes: votes,
    votesCount: votesCount,
    message: null,
    votedSuccess: false,
    loading: false,
  });

  const resetState = () => {
    setTimeout(() => {
      setVoteData((prevState) => ({
        ...prevState,
        message: null,
        votedSuccess: false,
        loading: false,
      }));
    }, 1200);
  };

  const handleVoteClick = (mode) => {
    setVoteData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    CommentService.commentVote(commentId, mode, userId, authToken).then(
      (response) => {
        let count = 0;

        if (mode === 'up') {
          count = 1;
        } else if (mode === 'down') {
          count = -1;
        }

        setVoteData((prevState) => ({
          ...prevState,
          votes: votes + count,
          votesCount: votesCount + 1,
          message: response.message,
          votedSuccess: true,
        }));

        resetState();
      },
      (error) => {
        setVoteData((prevState) => ({
          ...prevState,
          message:
            error.response.status === 401
              ? 'Zaloguj się'
              : error.response.data.error,
          votedSuccess: false,
        }));

        resetState();
      }
    );
  };

  return (
    <VotingWrapper>
      <VotingIcon
        disabled={voteData.loading}
        voteaction='plus'
        onClick={() => handleVoteClick('up')}
      >
        <AddBoxIcon fontSize='small' />
      </VotingIcon>
      <VotesStatus>
        {voteData.votes > 0 ? '+' + voteData.votes : voteData.votes}
        <span>({voteData.votesCount})</span>
      </VotesStatus>
      <VotingIcon
        disabled={voteData.loading}
        voteaction='down'
        onClick={() => handleVoteClick('down')}
      >
        <IndeterminateCheckBoxIcon fontSize='small' />
      </VotingIcon>
      <StyledVoteMessage issuccess={voteData.votedSuccess ? 1 : 0}>
        {voteData.message}
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
