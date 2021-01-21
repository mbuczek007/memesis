import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import CommentService from '../../../services/comment.service';
import ItemService from '../../../services/item.service';
import { useSelector } from 'react-redux';

const Rating = ({ ratingMode, ratedElemId, votes, votesCount }) => {
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

  const getCommentMode = () => {
    return ratingMode === 'comment';
  };

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

  const getCountBasedOnMode = (mode) => {
    let count = 0;

    if (mode === 'up') {
      count = 1;
    } else if (mode === 'down') {
      count = -1;
    }

    return count;
  };

  const fireSuccessAction = (mode, response) => {
    setVoteData((prevState) => ({
      ...prevState,
      votes: votes + getCountBasedOnMode(mode),
      votesCount: votesCount + 1,
      message: response.message,
      votedSuccess: true,
    }));

    resetState();
  };

  const firetErrorAction = (error) => {
    setVoteData((prevState) => ({
      ...prevState,
      message:
        error.response.status === 401
          ? 'Zaloguj się'
          : error.response.data.error,
      votedSuccess: false,
    }));

    resetState();
  };

  const handleVoteClick = (mode) => {
    setVoteData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    if (getCommentMode()) {
      CommentService.commentVote(ratedElemId, mode, userId, authToken).then(
        (response) => {
          fireSuccessAction(mode, response);
        },
        (error) => {
          firetErrorAction(error);
        }
      );
    } else {
      ItemService.itemVote(ratedElemId, mode).then(
        (response) => {
          fireSuccessAction(mode, response);
        },
        (error) => {
          firetErrorAction(error);
        }
      );
    }
  };

  return (
    <VotesActtionPanel>
      <VoteStatus iscommentmode={getCommentMode()}>
        <span>
          {voteData.votes > 0 ? '+' + voteData.votes : voteData.votes}
        </span>{' '}
        / ({voteData.votesCount})
      </VoteStatus>
      <VotingIcon
        voteaction='plus'
        onClick={() => handleVoteClick('up')}
        disabled={voteData.loading}
      >
        <AddBoxIcon fontSize={getCommentMode() ? 'small' : 'large'} />
      </VotingIcon>
      <VotingIcon
        voteaction='down'
        onClick={() => handleVoteClick('down')}
        disabled={voteData.loading}
      >
        <IndeterminateCheckBoxIcon
          fontSize={getCommentMode() ? 'small' : 'large'}
        />
      </VotingIcon>
      <StyledVoteMessage
        iscommentmode={getCommentMode()}
        isSuccess={voteData.votedSuccess}
      >
        {voteData.message}
      </StyledVoteMessage>
    </VotesActtionPanel>
  );
};

const VotesActtionPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  position: relative;
`;

const VoteStatus = styled.div`
  text-align: right;
  margin-bottom: 5px;
  flex-basis: 100%;

  ${({ iscommentmode }) =>
    iscommentmode &&
    `
    font-size: 12px;
  `}

  span {
    font-weight: 700;
  }
`;

const VotingIcon = styled(IconButton)`
  padding: 0;

  ${({ voteaction, theme }) =>
    voteaction &&
    `
    color: ${voteaction === 'plus' ? `#4caf50` : theme.palette.secondary.main};
  `}
`;

const StyledVoteMessage = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: 12px;
  top: -16px;
  width: 240px;
  text-align: right;
  color: ${({ isSuccess }) =>
    `
    ${isSuccess ? 'green' : 'red'};

  `};

  ${({ iscommentmode }) =>
    iscommentmode &&
    `
    font-size: 11px;
  `}
`;

export default Rating;
