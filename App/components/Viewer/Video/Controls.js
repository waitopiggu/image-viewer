import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Toolbar } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import {
  Pause,
  PlayArrow,
  PlayCircleFilled,
  PlayListPlay,
  Repeat,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';

type Props = {
  autoplay: boolean,
  classes: any,
  currentTime: number,
  duration: number,
  handleFileChange: Function,
  handlePrefsChange: Function,
  loop: boolean,
  muted: boolean,
  onTogglePlay: Function,
  onSeek: Function,
  paused: boolean,
  playDir: boolean,
  volume: number,
};

const Controls = ({
  autoplay,
  classes,
  currentTime,
  duration,
  handleFileChange,
  handlePrefsChange,
  loop,
  muted,
  onTogglePlay,
  onSeek,
  paused,
  playDir,
  volume,
}: Props) => (
  <React.Fragment>
    <Slider max={duration} onChange={onSeek} value={currentTime} />
    <Toolbar>
      <Grid
        alignItems="center"
        container
        direction="row"
        justify="space-between"
        spacing={24}
      >
        <Grid item xs>
          <IconButton
            color={playDir ? 'primary' : 'default'}
            onClick={handlePrefsChange('playDir', !playDir)}
          >
            <PlayListPlay />
          </IconButton>
          <IconButton
            color={autoplay ? 'primary' : 'default'}
            onClick={handlePrefsChange('autoplay', !autoplay)}
          >
            <PlayCircleFilled />
          </IconButton>
          <IconButton
            color={loop ? 'primary' : 'default'}
            onClick={handlePrefsChange('loop', !loop)}>
            <Repeat />
          </IconButton>
        </Grid>
        <Grid item xs>
          <IconButton onClick={handleFileChange('previous')}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={onTogglePlay}>
            {paused ? <PlayArrow /> : <Pause />}
          </IconButton>
          <IconButton onClick={handleFileChange('next')}>
            <SkipNext />
          </IconButton>
        </Grid>
        <Grid container item xs alignItems="center">
          <IconButton
            onClick={handlePrefsChange('muted', !muted)}
          >
            {muted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <div className={classes.volumeContainer}>
            <Slider
              max={1}
              onChange={handlePrefsChange('volume')}
              value={volume}
            />
          </div>
        </Grid>
      </Grid>
    </Toolbar>
  </React.Fragment>
);

const styles = theme => ({
  volumeContainer: {
    display: 'inline-flex',
    width: 128,
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Controls);
