import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreVert,
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';
import { format } from '../../../lib';

const MAX_PLAYBACK_RATE = 2;
const MIN_PLAYBACK_RATE = 0.25;

type Props = {
  classes: any,
  currentTime: number,
  duration: number,
  handleFileChange: Function,
  handlePrefsChange: Function,
  muted: boolean,
  onMenuClick: Function,
  onTogglePlay: Function,
  onSeek: Function,
  paused: boolean,
  playbackRate: number,
  volume: number,
};

const Controls = ({
  classes,
  currentTime,
  duration,
  handleFileChange,
  handlePrefsChange,
  muted,
  onMenuOpen,
  onTogglePlay,
  onSeek,
  paused,
  playbackRate,
  volume,
}: Props) => (
  <Tooltip
    title={`${format.hhmmss(currentTime)}${
      playbackRate > 1 || playbackRate < 1 ? ` * ${playbackRate}` : ''
    }`}
  >
    <Toolbar disableGutters>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="space-between"
      >
        <Grid item xs={12} container direction="row" justify="center">
          <Slider max={duration} onChange={onSeek} value={currentTime} />
        </Grid>
        <Grid item xs={3}>
          <IconButton onClick={onMenuOpen}>
            <MoreVert />
          </IconButton>
        </Grid>
        <Grid container item xs={6} justify="center">
          <IconButton onClick={handlePrefsChange(
            'playbackRate',
            Math.max(MIN_PLAYBACK_RATE, playbackRate - 0.25),
          )}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton onClick={handleFileChange('previous')}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={onTogglePlay}>
            {paused ? <PlayArrow /> : <Pause />}
          </IconButton>
          <IconButton onClick={handleFileChange('next')}>
            <SkipNext />
          </IconButton>
          <IconButton onClick={handlePrefsChange(
            'playbackRate',
            Math.min(MAX_PLAYBACK_RATE, playbackRate + 0.25),
          )}>
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
        <Grid container item xs={3} alignItems="center" justify="flex-end">
          <div className={classes.volumeContainer}>
            <Slider
              max={1}
              onChange={handlePrefsChange('volume')}
              value={volume}
            />
          </div>
          <IconButton
            onClick={handlePrefsChange('muted', !muted)}
          >
            {muted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  </Tooltip>
);

const styles = theme => ({
  volumeContainer: {
    display: 'inline-flex',
    width: 96,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Controls);
