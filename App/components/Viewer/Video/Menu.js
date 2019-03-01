import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItemText, ListItemSecondaryAction, Menu as MuiMenu, MenuItem, Switch,
} from '@material-ui/core';


type Props = {
  anchorEl: any,
  autoplay: boolean,
  classes: any,
  fit: boolean,
  handlePrefsChange: Function,
  onClose: Function,
  open: boolean,
  loop: boolean,
  playAll: boolean,
  shuffle: boolean,
};

const Menu = ({
  anchorEl,
  autoplay,
  classes,
  fit,
  handlePrefsChange,
  onClose,
  open,
  loop,
  playAll,
  shuffle,
}: Props) => {
  const onAutoplay = handlePrefsChange('autoplay', !autoplay);
  const onFit = handlePrefsChange('fit', !fit);
  const onLoop = handlePrefsChange('loop', !loop);
  const onPlayDir = handlePrefsChange('playAll', !playAll);
  const onShuffle = handlePrefsChange('shuffle', !shuffle);
  return (
    <MuiMenu
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      onClose={onClose}
      open={open}
    >
      <MenuItem onClick={onAutoplay}>
        <ListItemText primary="Autoplay" />
        <ListItemSecondaryAction>
          <Switch checked={autoplay} onChange={onAutoplay} />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem onClick={onFit}>
        <ListItemText primary="Fit to window" />
        <ListItemSecondaryAction>
          <Switch checked={fit} onChange={onFit} />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem onClick={onLoop}>
        <ListItemText primary="Loop" />
        <ListItemSecondaryAction>
          <Switch checked={loop} onChange={onLoop} />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem onClick={onPlayDir}>
        <ListItemText primary="Play all" />
        <ListItemSecondaryAction>
          <Switch checked={playAll} onChange={onPlayDir} />
        </ListItemSecondaryAction>
      </MenuItem>
      <MenuItem onClick={onShuffle}>
        <ListItemText primary="Shuffle" />
        <ListItemSecondaryAction>
          <Switch checked={shuffle} onChange={onShuffle} />
        </ListItemSecondaryAction>
      </MenuItem>
    </MuiMenu>
  );
};

const styles = theme => ({
  paper: {
    width: 180,
  },
});

export default withStyles(styles)(Menu);
