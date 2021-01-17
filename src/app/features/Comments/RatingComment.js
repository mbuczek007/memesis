import React, { useState } from 'react';
import styled from 'styled-components';

function RatingComment(props) {
  const [count, setCount] = useState(props.votes);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);

  return (
    <div {...props}>
      <button
        className={`material-icons ${thumbsUp ? 'selected' : ''}`}
        id='thumbs_up'
        onClick={() => {
          setThumbsUp(!thumbsUp);
          setThumbsDown(false);
        }}
      >
        keyboard_arrow_up
      </button>
      <div
        className={`count ${thumbsUp ? 'up' : ''} ${thumbsDown ? 'down' : ''}`}
      >
        {thumbsUp ? count + 1 : ''}
        {thumbsDown ? count - 1 : ''}
        {thumbsUp || thumbsDown ? '' : count}
      </div>
      <button
        className={`material-icons ${thumbsDown ? 'selected' : ''}`}
        id='thumbs_down'
        onClick={() => {
          setThumbsDown(!thumbsDown);
          setThumbsUp(false);
        }}
      >
        keyboard_arrow_down
      </button>
    </div>
  );
}

export default RatingComment = styled(RatingComment)`
  display: flex;
  flex-direction: column;
  margin-right: 12px;

  .count {
    font-weight: bold;
    text-align: center;
    color: #3d4953;

    &.up {
      color: #4f9eed;
    }

    &.down {
      color: #ed4f4f;
    }
  }

  button#thumbs_up,
  button#thumbs_down {
    border: none;
    background: none;
    cursor: pointer;
    color: #3d4953;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }

  #thumbs_up.selected {
    color: #4f9eed;
  }

  #thumbs_down.selected {
    color: #ed4f4f;
  }
`;
