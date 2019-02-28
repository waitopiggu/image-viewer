import React from 'react';
import mime from 'mime-types';
import {
  Avatar,
  Drawer,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowUpward, Folder, Refresh } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { filesystem } from '../../lib';

type Props = {
  changeDirectory: Function,
  classes: any,
  directory: string,
  files: Array<any>,
  parentDirectory: Function,
  setFile: Function,
};

class Browser extends React.PureComponent<Props> {

  componentDidMount() {
    const { directory, changeDirectory } = this.props;
    changeDirectory(directory);
  }

  handleListItemCLick = file => () => {
    if (file.isUp) {
      const { directory, parentDirectory } = this.props;
      parentDirectory(directory);
      this.scrollTop();
    } else if (file.isRefresh) {
      const { changeDirectory, directory } = this.props;
      changeDirectory(directory);
      this.scrollTop();
    } else if (file.isDirectory) {
      const { changeDirectory } = this.props;
      changeDirectory(file.path);
      this.scrollTop();
    } else {
      const { setFile } = this.props;
      setFile(file);
    }
  };

  scrollTop = () => {
    const paper = document.getElementById('browser-drawer-paper');
    paper.scrollTop = 0;
  };

  render() {
    const { classes, files } = this.props;
    return (
      <div>
        <Toolbar>
          <IconButton onClick={this.handleListItemCLick({ isUp: true })}>
            <ArrowUpward />
          </IconButton>
          <Typography className={classes.grow}>
            {`${files.length} items`}
          </Typography>
          <IconButton onClick={this.handleListItemCLick({ isRefresh: true })}>
            <Refresh />
          </IconButton>
        </Toolbar>
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          PaperProps={{ id: 'browser-drawer-paper' }}
          variant="permanent"
        >
          {files.map(file => (
            <ListItem
              button
              className={classes.listItem}
              key={file.filename}
              onClick={this.handleListItemCLick(file)}
            >
              {!(file.isImage || file.isVideo) ? (
                <ListItemIcon>
                  {file.isDirectory ? <Folder /> : <InsertDriveFile />}
                </ListItemIcon>
              ) : (
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    {file.isImage ? (
                      <img className={classes.media} src={file.path} />
                    ) : (
                      <video className={classes.media} src={file.path} />
                    )}
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText classes={{ primary: classes.listItemTextPrimary }}>
                {file.filename}
              </ListItemText>
            </ListItem>
          ))}
        </Drawer>
      </div>
    );
  }
}

const styles = theme => {
  const padding = theme.spacing.unit * 2;
  const { toolbar } = theme.mixins;
  const drawer = {
    overflow: 'auto',
    width: '100%',
    height: `calc(100vh - ${toolbar.minHeight}px)`,
  };
  for (const [key, value] of Object.entries(toolbar)) {
    if (typeof value === 'object') {
      drawer[key] = {
        height: `calc(100vh - ${toolbar[key].minHeight}px)`,
      };
    }
  }
  return {
    avatar: {
      background: 0,
      borderRadius: theme.shape.borderRadius,
    },
    drawer,
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 300,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    listItem: {
      maxHeight: 56,
      minHeight: 56,
    },
    listItemTextPrimary: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    media: {
      objectFit: 'contain',
      width: 'inherit',
      height: 'inherit',
    },
  };
};

export default withStyles(styles)(Browser);
