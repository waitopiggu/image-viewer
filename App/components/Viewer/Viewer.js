import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Video from './Video';

type Props = {
  file: any,
};

class Viewer extends React.PureComponent<Props, State> {

  render() {
    const { classes, file } = this.props;
    return (
      <div className={classes.root}>
        {file.isVideo ? (
          <Video />
        ) : (
          <img
            className={classes.content}
            src={file.path}
          />
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    overflowX: 'hidden',
  },
})

export default withStyles(styles)(Viewer);
