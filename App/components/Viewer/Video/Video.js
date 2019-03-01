import React from 'react';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Controls from './Controls';
import Menu from './Menu';

type Props = {
  classes: any,
  contentClass: any,
  file: any,
  setFile: Function,
  setVideoPrefs: Function,
  videoPrefs: any,
};

type State = {
  anchorEl: null,
  videoElement: null,
};

class Video extends React.Component<Props, State> {

  state = {
    anchorEl: null,
    videoElement: null,
  };

  componentDidUpdate(prevProps) {
    const { videoPrefs } = this.props;
    if (!isEqual(videoPrefs, prevProps.videoPrefs)) {
      this.setElementPrefs();
    }
  }

  setElementPrefs = () => {
    const { videoElement } = this.state;
    const { videoPrefs } = this.props;
    videoElement.autoplay = videoPrefs.autoplay;
    videoElement.loop = videoPrefs.loop;
    videoElement.muted = videoPrefs.muted;
    videoElement.playbackRate = videoPrefs.playbackRate;
    videoElement.volume = videoPrefs.volume;
    this.setState({ videoElement });
  };

  handleFileChange = (direction) => this.onFileChange;

  handlePrefsChange = (name, value = 0) => (event, targetValue) => {
    const { setVideoPrefs } = this.props;
    setVideoPrefs({ [name]: targetValue || value });
  };

  onEnded = () => {
    const { videoPrefs } = this.props;
    if (!videoPrefs.loop && videoPrefs.playAll) {
      this.onFileChange('next');
    } else {
      this.onUpdate();
    }
  };

  onFileChange = (direction) => {
    const { videoPrefs } = this.props;
    if (videoPrefs.shuffle) {
      const { randomFile } = this.props;
      randomFile();
    } else {
      const { nextFile } = this.props;
      nextFile(direction);
    }
  };

  onLoadStart = (event) => {
    const videoElement = event.target;
    this.setState({ videoElement }, this.setElementPrefs);
  };

  onMenuClose = () => this.setState({ anchorEl: null });

  onMenuOpen = (event) => {
    const anchorEl = event.currentTarget;
    this.setState({ anchorEl });
  };

  onSeek = (event, value) => {
    const { videoElement } = this.state;
    videoElement.currentTime = value;
    this.setState({ videoElement });
  };

  onTogglePlay = () => {
    const { videoElement } = this.state;
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    this.setState({ videoElement });
  };

  onUpdate = () => {
    const { videoElement } = this.state;
    this.setState({ videoElement });
  };

  render() {
    const { anchorEl, videoElement } = this.state;
    const { classes, contentClass, file, videoPrefs } = this.props;
    return (
      <div className={contentClass}>
        <Grid container justify="center" className={classes.videoContainer}>
          <video
            className={classNames([
              classes.video,
              videoPrefs.fit && classes.videoFit,
            ])}
            onEnded={this.onEnded}
            onLoadedMetadata={this.onUpdate}
            onLoadStart={this.onLoadStart}
            onTimeUpdate={this.onUpdate}
            src={file.path}
          />
        </Grid>
        {videoElement && (
          <Controls
            {...videoPrefs}
            currentTime={videoElement.currentTime}
            duration={videoElement.duration}
            handleFileChange={this.handleFileChange}
            handlePrefsChange={this.handlePrefsChange}
            onMenuOpen={this.onMenuOpen}
            onSeek={this.onSeek}
            onTogglePlay={this.onTogglePlay}
            paused={videoElement.paused}
          />
        )}
        <Menu
          {...videoPrefs}
          anchorEl={anchorEl}
          handlePrefsChange={this.handlePrefsChange}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        />
      </div>
    );
  }
}

const styles = theme => ({
  video: {
    maxWidth: '100%',
  },
  videoFit: {
    width: '100%',
  },
  videoContainer: {
    height: '100%',
  },
});

export default withStyles(styles)(Video);
