import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { electron } from './lib';
import { AppBar, Browser, Viewer } from './components';

type Props = {
  classes: any,
  setWindowSize: Function,
};



class App extends React.PureComponent<Props> {

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (event) => {
    const currentWindow = electron.getCurrentWindow();
    const size = currentWindow.getSize()
    const { setWindowSize } = this.props;
    setWindowSize(...size);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar />
        <Browser />
        <Viewer />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

export default withStyles(styles)(App);
