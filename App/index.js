import React from 'react';
import { render } from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Store from './Store';
import { Browser, Viewer } from './components';

/**
 * App Component
 */
const App = ({ classes }) => (
  <Store>
    <div className={classes.root}>
      <CssBaseline />
      <Browser />
      <Viewer />
    </div>
  </Store>
);

const StyledApp = withStyles(theme => ({
  root: {
    display: 'flex',
  },
}))(App);

render(<StyledApp />, document.getElementById('react-root'));
