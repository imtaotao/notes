import React from 'react';
import extraScopePlugin from 'stylis-plugin-extra-scope';
import styled, { StyleSheetManager } from './styled-components';

const Button = styled.button`
  color: red;
  background: white;

  .text {
    font-size: 12px;
    color: #000;
  }
`;

const Div = styled.div`
  color: #4b56d3;
  background: #ffaff2;
`;

export function App() {
  return (
    <StyleSheetManager stylisPlugins={[extraScopePlugin('.scope')]}>
      <div className="scope">
        <Button>
          button
          <span className="text">text</span>
        </Button>
        <Div>div</Div>
      </div>
    </StyleSheetManager>
  );
}
