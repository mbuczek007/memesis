import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import CardLInk from './CardLink';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import CommentIcon from '@material-ui/icons/Comment';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import 'moment/locale/pl';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ReactFBLike from 'react-fb-like';
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';
import Rating from './../../shared/Rating/Rating';

const CardItem = ({ item, linked, loading }) => {
  moment.locale('pl');

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [item]);

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
          {item.isAccepted && (
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
          )}
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
            {item.disableComments ? (
              <DisabledCommentIcon fontSize='small' />
            ) : (
              <CardLInk linked={linked} itemId={item.id} commentsMode>
                <StyledBadge
                  badgeContent={
                    item.commentsCount === 0 ? '0' : item.commentsCount
                  }
                  max={99}
                  color='secondary'
                >
                  <StyledCommentIcon fontSize='small' />
                </StyledBadge>
              </CardLInk>
            )}
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
            <Rating
              ratingMode='item'
              ratedElemId={item.id}
              votes={item.votes}
              votesCount={item.votesCount}
            />
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
  .MuiBadge-badge {
    font-weight: 400;
    top: 1px;
    right: -5px;
    font-weight: 400;
    padding: 0 4px;
  }
`;

const StyledCommentIcon = styled(CommentIcon)`
  margin-left: 6px;
`;

const DisabledCommentIcon = styled(StyledCommentIcon)`
  opacity: 0.5;
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
