import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommentContext } from './Comments';
import AddCommentForm from './AddCommentForm';
import RatingComment from './RatingComment';
import moment from 'moment';
import { useSelector } from 'react-redux';

const compare = (a1, a2) => {
  return JSON.stringify(a1) === JSON.stringify(a2);
};

function Comment(props) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [replying, setReplying] = useContext(CommentContext);

  return (
    <div {...props}>
      <div id='left'>
        <RatingComment votes={props.votes} />
      </div>
      <div id='right'>
        <div id='top'>
          <span id='username'>{props.username}</span>
          <span id='date'>{moment(props.date).fromNow()}</span>
        </div>
        <div id='content'>{props.text}</div>
        {isLoggedIn && (
          <>
            <div id='actions'>
              <span
                onClick={() => {
                  if (compare(replying, props.path)) {
                    setReplying([]);
                  } else {
                    setReplying(props.path);
                  }
                }}
              >
                {!compare(replying, props.path) ? 'Odpowiedz' : 'Anuluj'}
              </span>
            </div>
            {compare(replying, props.path) && (
              <AddCommentForm
                commentsReloading={() => {
                  setReplying([]);
                  props.commentsReloading();
                }}
                itemId={props.itemId}
                parentCommentId={props.comment_id}
              />
            )}
          </>
        )}
        {props.comments && (
          <div className='comments'>
            {props.comments.map((comment, i) => {
              return (
                <Comment
                  commentsReloading={() => {
                    props.commentsReloading();
                  }}
                  parentCommentId={comment.parentCommentId}
                  itemId={comment.itemId}
                  comment_id={comment.comment_id}
                  username={comment.userName}
                  date={comment.createdAt}
                  text={comment.commentBody}
                  votes={comment.votes}
                  colorindex={props.colorindex + 1}
                  key={i}
                  path={[...[...props.path], i]}
                  comments={comment.comments}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment = styled(Comment)`
  display: flex;
  text-align: left;
  background: #fff;
  padding: 16px 16px 16px 12px;
  border: 0.1px solid #ccc;
  border-radius: 8px;

  .comments {
    > * {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }

  #left {
    text-align: center;
  }

  #right {
    flex-grow: 1;

    #top {
      #username {
        color: #4f9eed;
      }

      #date {
        display: inline-block;
        color: #53626f;
      }

      > * {
        margin-right: 8px;
      }
    }

    #content {
      color: ##000;
    }

    #actions {
      > * {
        cursor: pointer;
        margin-right: 8px;
      }
    }
  }
`;
