import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  InputBase, AppBar as MuiAppBar, Toolbar, Typography,
} from '@material-ui/core';
import { filesystem } from '../../lib';
import { drawerWidth } from '../../common/styles';

type Props = {
  classes: any,
  directory: string,
  file: any,
};

type State = {
  editing: boolean,
  path: string,
};

class AppBar extends React.Component<Props, State> {
  state = {
    editing: false,
    path: '',
  };

  onEditing = () => {
    const { directory } = this.props;
    this.setState({
      editing: true,
      path: directory,
    });
  };

  onPathChange = event => this.setState({
    path: event.target.value,
  });

  onPathSet = async event => {
    event.preventDefault();
    const { path } = this.state;
    const { directory } = this.props;
    if (path !== directory) try {
      const file = await filesystem.stat(path);
      if (file.isDirectory()) {
        const { changeDirectory } = this.props;
        changeDirectory(path);
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({ editing: false, path: '' });
  };

  render() {
    const { classes, directory, file } = this.props;
    const { editing, path } = this.state;
    return (
      <MuiAppBar className={classes.appBar} color="default" position="absolute">
        <Toolbar>
          {editing ? (
            <form className={classes.form} onSubmit={this.onPathSet}>
              <InputBase
                autoFocus
                fullWidth
                onChange={this.onPathChange}
                onBlur={this.onPathSet}
                value={path}
            />
            </form>
          ) : (
            <Typography className={classes.title} variant="h6" onClick={this.onEditing}>
              {file.path || directory}
            </Typography>
          )}
        </Toolbar>
      </MuiAppBar>
    );
  }
}

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  form: {
    width: '100%',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles)(AppBar);
