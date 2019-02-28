import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { drawerWidth } from '../../common/styles';

type Props = {
  classes: any,
  directory: string,
  file: any,
};

const AppBar = ({ classes, directory, file }) => (
  <MuiAppBar className={classes.appBar} color="default" position="absolute">
    <Toolbar>
      <Typography className={classes.title} variant="h6">
        {file.path || directory}
      </Typography>
    </Toolbar>
  </MuiAppBar>
);

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default withStyles(styles)(AppBar);
