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
import { ArrowUpward, Folder, InsertDriveFile, Refresh } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { filesystem } from '../../lib';

type Props = {
  changeDirectory: Function,
  classes: any,
  directory: string,
  fileIndex: number,
  files: Array<any>,
  parentDirectory: Function,
  setFile: Function,
};

class Browser extends React.PureComponent<Props> {

  componentDidMount() {
    const { directory, changeDirectory } = this.props;
    changeDirectory(directory);
  }

  componentDidUpdate(prevProps) {
    const { fileIndex } = this.props;
    if (fileIndex >= 0 && fileIndex !== prevProps.fileIndex) {
      const element = document.getElementById(`browser-list-item-${fileIndex}`);
      element.scrollIntoView(false);
    }
  }

  handleListItemCLick = file => () => {
    if (file.isUp) {
      const { directory, parentDirectory } = this.props;
      parentDirectory(directory);
    } else if (file.isRefresh) {
      const { changeDirectory, directory } = this.props;
      changeDirectory(directory);
    } else if (file.isDirectory) {
      const { changeDirectory } = this.props;
      changeDirectory(file.path);
    } else {
      const { setFile } = this.props;
      setFile(file);
    }
  };

  render() {
    const { classes, fileIndex, files } = this.props;
    return (
      <div>
        <Toolbar>
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
          <ListItem
            button
            className={classes.listItem}
            onClick={this.handleListItemCLick({ isUp: true })}
          >
            <ListItemIcon><ArrowUpward /></ListItemIcon>
            <ListItemText>..</ListItemText>
          </ListItem>
          {files.map(file => (
            <ListItem
              button
              className={classes.listItem}
              key={file.filename}
              id={`browser-list-item-${file.index}`}
              onClick={this.handleListItemCLick(file)}
              selected={file.index === fileIndex}
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
