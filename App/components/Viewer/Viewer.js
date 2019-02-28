import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Image from './Image';
import Video from './Video';

type Props = {
  file: any,
};

const Viewer = ({ classes, file }: Props) => (
  <div className={classes.root}>
    <div className={classes.toolbar} />
    {file.isVideo && <Video contentClass={classes.content} />}
    {file.isImage && <Image contentClass={classes.content} />}
  </div>
);

const styles = theme => {
  const padding = theme.spacing.unit * 2;
  const { toolbar } = theme.mixins;
  const content = {
    width: '100%',
    height: `calc(100vh - ${toolbar.minHeight * 2}px - ${padding * 2}px)`,
  };
  for (const [key, value] of Object.entries(toolbar)) {
    if (typeof value === 'object') {
      content[key] = {
        height: `calc(100vh - ${toolbar[key].minHeight * 2}px - ${padding * 2}px)`,
      };
    }
  }
  return {
    content,
    root: {
      flexGrow: 1,
      height: '100vh',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      overflow: 'hidden',
      padding,
    },
    toolbar: theme.mixins.toolbar,
  };
};

export default withStyles(styles)(Viewer);
