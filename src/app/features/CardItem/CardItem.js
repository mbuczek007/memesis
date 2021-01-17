import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import CardLInk from './CardLink';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import 'moment/locale/pl';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ItemService from '../../../services/item.service';
import ReactFBLike from 'react-fb-like';
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';

const CardItem = ({ item, linked, loading }) => {
  moment.locale('pl');
  const [votes, setVotes] = useState(0);
  const [votesCount, setVotesCount] = useState(0);
  const [voteMessage, setVoteMessage] = useState('');
  const [voteMessageSuccess, setVoteMessageSuccess] = useState(false);
  useEffect(() => {
    setVotes(item ? item.votes : 0);
    setVotesCount(item ? item.votesCount : 0);
  }, [item]);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [item]);

  const handleVoteClick = (mode) => {
    setVoteMessage('');

    ItemService.itemVote(item.id, mode).then(
      (response) => {
        let count = 0;

        if (mode === 'up') {
          count = 1;
        } else if (mode === 'down') {
          count = -1;
        }

        setVotes(item.votes + count);
        setVotesCount(item.votesCount + 1);
        setVoteMessage(response.message);
        setVoteMessageSuccess(true);
      },
      (error) => {
        setVoteMessage(error.response.data.error);
        setVoteMessageSuccess(false);
      }
    );
  };

  return (
    <ItemWrapper>
      <StyledMuiCard variant='outlined' square>
        {loading ? (
          <Skeleton variant='rect' height={400} animation='wave' />
        ) : (
          <CardLInk linked={linked} itemId={item.id}>
            <img src={item.mediaUrl} alt={item.title} />
          </CardLInk>
        )}
        <div>
          <TypographyTitle variant='h5' component='h2'>
            {loading ? (
              <StyledSkeleton animation='wave' width='75%' height={40} />
            ) : (
              <CardLInk linked={linked} itemId={item.id}>
                {item.title}
              </CardLInk>
            )}
          </TypographyTitle>
          <TypographySubtitle variant='subtitle1' component='h3'>
            {loading ? (
              <StyledSkeleton animation='wave' width='45%' />
            ) : (
              <CardLInk linked={linked} itemId={item.id}>
                {item.subtitle}
              </CardLInk>
            )}
          </TypographySubtitle>
        </div>
      </StyledMuiCard>
      {loading ? (
        <StyledSkeleton animation='wave' width='25%' />
      ) : (
        <>
          {item.source && (
            <Source gutterBottom variant='body1'>
              Źródło: {item.source}
            </Source>
          )}

          <FacebookActions>
            <ReactFBLike
              language='pl_PL'
              appId='358432648571666'
              version='v2.12'
              layout='button_count'
              href={`https://jbzd.com.pl/obr/1721666/pogromcy-mitow/${item.id}`}
            />
            <FacebookMessengerShareButton
              url='https://jbzd.com.pl/obr/1721666/pogromcy-mitow'
              appId='358432648571666'
            >
              <FacebookMessengerIcon size={22} round />
            </FacebookMessengerShareButton>
          </FacebookActions>
        </>
      )}
      <ItemMeta>
        {loading ? (
          <Skeleton animation='wave' width='40%' />
        ) : (
          <DateInfoWrapper>
            <ScheduleIcon fontSize='small' />
            {moment(item.createdAt).fromNow()}
            <span> przez:</span> {item.userName} |
            <CardLInk linked={linked} itemId={item.id} commentsMode>
              <StyledBadge
                badgeContent={
                  item.commentsCount === 0 ? '0' : item.commentsCount
                }
                max={99}
                color='secondary'
              >
                <CommentIcon fontSize='small' />
              </StyledBadge>
            </CardLInk>
          </DateInfoWrapper>
        )}
        <VotesActtionPanel>
          {loading ? (
            <>
              <VoteStatus>
                <StyledSkeleton animation='wave' width='100%' />
              </VoteStatus>
              <VotingSkeletonButtton
                variant='rect'
                width={25}
                height={25}
                animation='wave'
              />
              <VotingSkeletonButtton
                variant='rect'
                width={25}
                height={25}
                animation='wave'
              />
            </>
          ) : (
            <>
              <VoteStatus>
                <span>{votes > 0 ? '+' + votes : votes}</span> / ({votesCount})
              </VoteStatus>
              <VotingIcon
                voteaction='plus'
                onClick={(e) => handleVoteClick('up')}
              >
                <AddBoxIcon fontSize='large' />
              </VotingIcon>
              <VotingIcon
                voteaction='down'
                onClick={(e) => handleVoteClick('down')}
              >
                <IndeterminateCheckBoxIcon fontSize='large' />
              </VotingIcon>
              <StyledVoteMessage isSuccess={voteMessageSuccess}>
                {voteMessage}
              </StyledVoteMessage>
            </>
          )}
        </VotesActtionPanel>
      </ItemMeta>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.article`
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
  padding: 40px 70px 35px;
  background-color: #fafafa;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const StyledMuiCard = styled(Paper)`
  text-align: center;
  padding: 20px;
  margin-bottom: 4px;

  img {
    width: 100%;
    height: auto;
  }
`;

const StyledVoteMessage = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: 12px;
  top: -21px;
  width: 240px;
  text-align: right;
  color: ${({ isSuccess }) =>
    `
    ${isSuccess ? 'green' : 'red'};

  `};
`;

const TypographyTitle = styled(Typography)`
  font-weight: 700;
  padding: 15px 0 5px;
`;

const TypographySubtitle = styled(Typography)`
  font-weight: 400;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  div:first-child > span {
    font-weight: 700;
  }
`;

const DateInfoWrapper = styled.div`
  > svg {
    position: relative;
    top: 5px;
    margin-right: 4px;
  }
`;

const StyledBadge = styled(Badge)`
  margin-left: 6px;

  .MuiBadge-badge {
    font-weight: 400;
    top: 1px;
    right: -5px;
    font-weight: 400;
    padding: 0 4px;
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

const Source = styled(Typography)`
  text-align: center;
  font-size: 12px;
  color: #8e8e8e;
`;

const StyledSkeleton = styled(Skeleton)`
  margin: 0 auto;
`;

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
`;

const VotingSkeletonButtton = styled(Skeleton)`
  display: inline-block;
  margin: 4px;
`;

const FacebookActions = styled.div`
  text-align: center;
  position: relative;
  margin-top: 12px;
  margin-bottom: -10px;
`;

export default CardItem;
