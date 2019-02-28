import React from 'react';
import { render } from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Store from './Store';
import { AppBar, Browser, Viewer } from './components';

/**
 * App Component
 */
const App = ({ classes }) => (
  <Store>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <Browser />
      <Viewer />
    </div>
  </Store>
);

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

const StyledApp = withStyles(styles)(App);

render(<StyledApp />, document.getElementById('react-root'));
