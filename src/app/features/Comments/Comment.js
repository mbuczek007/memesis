import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CommentContext } from './Comments';
import AddCommentForm from './AddCommentForm';
import moment from 'moment';
import { useSelector } from 'react-redux';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Rating from './../../shared/Rating/Rating';

const Comment = ({ comment, commentsReloading, path }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [replying, setReplying] = useContext(CommentContext);
  const [showReply, setShowReply] = useState(false);

  const compare = (a1, a2) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
  };

  const handleCommentsReloading = (newCommentId) => {
    setReplying([]);
    setShowReply(true);
    commentsReloading(newCommentId);
  };

  const handleCancelReply = () => {
    return compare(replying, path) ? setReplying([]) : setReplying(path);
  };

  return (
    <StyledListItem isfirstlevel={comment.parentCommentId}>
      <ScrollCommentAnchor id={comment.comment_id}></ScrollCommentAnchor>
      <StyledAvatar>{comment.userName.charAt(0)}</StyledAvatar>
      <ListItemText
        primary={
          <>
            <UserName component='span' variant='subtitle1'>
              {comment.userName}
            </UserName>
            <StyledDate component='span' variant='body2'>
              <ScheduleIcon style={{ fontSize: 12 }} />
              {moment(comment.createdAt).fromNow()}
            </StyledDate>
          </>
        }
        secondary={comment.commentBody}
      />
      <Rating
        ratingMode='comment'
        ratedElemId={comment.comment_id}
        votes={comment.votes}
        votesCount={comment.votesCount}
      />
      <CommentActions>
        {comment.comments && (
          <ActionLinkReply
            isshowreply={showReply ? 1 : 0}
            component='button'
            variant='body2'
            color='primary'
            onClick={() => {
              setShowReply(!showReply);
            }}
          >
            {!showReply ? (
              <>
                <KeyboardArrowDownIcon />
                Pokaz odpowiedzi ({comment.comments.length})
              </>
            ) : (
              <>
                <KeyboardArrowUpIcon />
                Ukryj odpowiedzi ({comment.comments.length})
              </>
            )}
          </ActionLinkReply>
        )}
        {isLoggedIn && (
          <>
            {!compare(replying, path) ? (
              <ActionLink
                component='button'
                variant='body2'
                color='primary'
                onClick={handleCancelReply}
              >
                Odpowiedz
              </ActionLink>
            ) : (
              <AddCommentForm
                itemId={comment.itemId}
                parentCommentId={comment.comment_id}
                commentsReloading={handleCommentsReloading}
                handleCancelClick={handleCancelReply}
              />
            )}
          </>
        )}
      </CommentActions>
      {comment.comments && showReply && (
        <StyledList>
          {comment.comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                comment={comment}
                commentsReloading={commentsReloading}
                path={[...[...path], i]}
              />
            );
          })}
        </StyledList>
      )}
    </StyledListItem>
  );
};

const ScrollCommentAnchor = styled.span`
  position: absolute;
  top: -100px;
`;

const StyledListItem = styled(ListItem)`
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
  padding-right: 0;
  border-top: 1px solid #ccc;
  padding-top: 15px;

  ${({ isfirstlevel }) =>
    isfirstlevel &&
    `
      padding-left: 20px;

  `}

  > ul {
    flex-basis: 100%;
  }

  .MuiListItemText-secondary {
    color: #000;
    margin: 8px 0 10px;
    font-size: 14px;
  }
`;

const CommentActions = styled.div`
  flex-basis: 100%;
  margin-left: 45px;
`;

const UserName = styled(Typography)`
  font-weight: 700;
  color: #595959;
  padding-right: 5px;
`;

const StyledDate = styled(Typography)`
  color: #a1a1a1;

  svg {
    position: relative;
    top: 1px;
    margin-right: 2px;
  }
`;

const StyledList = styled(List)`
  padding: 0;
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActionLinkReply = styled(ActionLink)`
  ${({ isshowreply }) =>
    isshowreply &&
    `
      font-weight: 700;

  `}
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

export default Comment;
