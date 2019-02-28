import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Video from './Video';

type Props = {
  file: any,
};

const Viewer = ({ classes, file }: Props) => (
  <div className={classNames([
    classes.root,
    file.isImage ? classes.overflowAuto : classes.overflowHidden,
  ])}>
    <div className={classes.toolbar} />
    {file.isVideo && <Video />}
    {file.isImage && <img className={classes.image} src={file.path} />}
  </div>
);

const styles = theme => ({
  image: {
    width: '100%',
  },
  overflowAuto: {
    overflow: 'auto',
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
    height: '100vh',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
})

export default withStyles(styles)(Viewer);
