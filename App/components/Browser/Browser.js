import React from 'react';
import mime from 'mime-types';
import {
  Drawer,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ArrowUpward, Folder, InsertDriveFile } from '@material-ui/icons';
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
    } else if (file.isDirectory) {
      const { changeDirectory } = this.props;
      changeDirectory(file.path);
    } else {
      const { setFile } = this.props;
      setFile(file);
    }
  };

  render() {
    const { classes, files } = this.props;
    return (
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
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
            onClick={this.handleListItemCLick(file)}
          >
            <ListItemIcon>
              {file.isDirectory ? <Folder /> : <InsertDriveFile />}
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemTextPrimary }}>
              {file.filename}
            </ListItemText>
          </ListItem>
        ))}
      </Drawer>
    );
  }
}

const styles = theme => ({
  drawer: {
    height: '100vh',
    overflowY: 'auto',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 300,
  },
  listItem: {
    maxHeight: 40,
    minHeight: 40,
  },
  listItemTextPrimary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default withStyles(styles)(Browser);
