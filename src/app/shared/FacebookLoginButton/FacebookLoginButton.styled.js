import styled from 'styled-components';

export const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  width: 13em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  font-family: 'Helvetica neue', Helvetica Neue, Helvetica, Arial, sans-serif;
  text-shadow: 0 -1px 0 #354c8c;
  cursor: pointer;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png')
      6px 6px no-repeat;
  }

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }

  &:hover,
  &:focus {
    background-color: #5b7bd5;
    background-image: linear-gradient(#5b7bd5, #4864b1);
  }
`;
