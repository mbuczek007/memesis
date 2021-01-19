import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CommentContext } from './Comments';
import AddCommentForm from './AddCommentForm';
import RatingComment from './RatingComment';
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

const Comment = ({
  path,
  commentsReloading,
  parentCommentId,
  comment_id,
  username,
  date,
  text,
  votes,
  votesCount,
  comments,
  itemId,
  colorindex,
}) => {
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
    if (compare(replying, path)) {
      setReplying([]);
    } else {
      setReplying(path);
    }
  };

  return (
    <StyledListItem isFirstLevel={parentCommentId}>
      <ScrollCommentAnchor id={comment_id}></ScrollCommentAnchor>
      <ListItemText
        primary={
          <>
            <UserName component='span' variant='subtitle'>
              {username}
            </UserName>
            <StyledDate component='span' variant='body2'>
              <ScheduleIcon style={{ fontSize: 12 }} />
              {moment(date).fromNow()}
            </StyledDate>
          </>
        }
        secondary={text}
      />
      <RatingComment votes={votes} votesCount={votesCount} />
      <CommentActions>
        {comments && (
          <ActionLinkReply
            isShowReply={showReply}
            component='button'
            variant='body1'
            onClick={() => {
              setShowReply(!showReply);
            }}
          >
            {!showReply ? (
              <>
                <KeyboardArrowDownIcon />
                Pokaz odpowiedzi ({comments.length})
              </>
            ) : (
              <>
                <KeyboardArrowUpIcon />
                Ukryj odpowiedzi ({comments.length})
              </>
            )}
          </ActionLinkReply>
        )}
        {isLoggedIn && (
          <>
            {!compare(replying, path) && (
              <ActionLink
                component='button'
                variant='body1'
                onClick={handleCancelReply}
              >
                Odpowiedz
              </ActionLink>
            )}
            {compare(replying, path) && (
              <AddCommentForm
                commentsReloading={handleCommentsReloading}
                itemId={itemId}
                parentCommentId={comment_id}
                replyUserName={username}
                handleCancelClick={handleCancelReply}
              />
            )}
          </>
        )}
      </CommentActions>
      {comments && showReply && (
        <StyledList>
          {comments.map((comment, i) => {
            return (
              <Comment
                commentsReloading={commentsReloading}
                parentCommentId={comment.parentCommentId}
                itemId={comment.itemId}
                comment_id={comment.comment_id}
                username={comment.userName}
                date={comment.createdAt}
                text={comment.commentBody}
                votes={comment.votes}
                votesCount={comment.votesCount}
                colorindex={colorindex + 1}
                key={i}
                path={[...[...path], i]}
                comments={comment.comments}
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

  ${({ isFirstLevel }) =>
    isFirstLevel &&
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
  color: #575757;
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
  ${({ isShowReply }) =>
    isShowReply &&
    `
      font-weight: 700;

  `}
`;

export default Comment;
