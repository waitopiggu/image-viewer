import React from 'react';
import { isEqual } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Controls from './Controls';

type Props = {
  classes: any,
  file: any,
  files: Array<any>,
  setFile: Function,
  setVideoPrefs: Function,
  videoPrefs: any,
};

class Video extends React.Component<Props, State> {

  state = {
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

  handleFileChange = (direction) => () => {
    const { file, files, setFile } = this.props;
    const { index } = file;
    if (direction === 'next') {
      const nextIndex = index === 0 ? files.length - 1 : index - 1;
      const nextFile = files[nextIndex];
      setFile(nextFile);
    } else if (direction === 'previous') {
      const previousIndex = index === files.length - 1 ? 0 : index + 1;
      const previousFile = files[previousIndex];
      setFile(previousFile);
    }
  };

  handlePrefsChange = (name, value = 0) => (event, targetValue) => {
    const { setVideoPrefs } = this.props;
    setVideoPrefs({ [name]: targetValue || value });
  };

  onEnded = () => {
    const { videoPrefs } = this.props;
    if (!videoPrefs.loop && videoPrefs.playDir) {
      this.handleFileChange('next');
    } else {
      this.onUpdate();
    }
  };

  onLoadStart = (event) => {
    const videoElement = event.target;
    this.setState({ videoElement }, this.setElementPrefs);
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
    const { videoElement } = this.state;
    const { classes, file, videoPrefs } = this.props;
    return (
      <div className={classes.root}>
        <video
          className={classes.video}
          onEnded={this.onEnded}
          onLoadedMetadata={this.onUpdate}
          onLoadStart={this.onLoadStart}
          onTimeUpdate={this.onUpdate}
          src={file.path}
        />
        {videoElement && (
          <Controls
            {...videoPrefs}
            currentTime={videoElement.currentTime}
            duration={videoElement.duration}
            handleFileChange={this.handleFileChange}
            handlePrefsChange={this.handlePrefsChange}
            onSeek={this.onSeek}
            onTogglePlay={this.onTogglePlay}
            paused={videoElement.paused}
          />
        )}
      </div>
    );
  }
}

const styles = theme => {
  const padding = theme.spacing.unit * 2;
  const { toolbar } = theme.mixins;
  const video = {
    width: '100%',
    height: `calc(100vh - ${toolbar.minHeight * 2}px - ${padding * 2}px)`,
  };
  for (const [key, value] of Object.entries(toolbar)) {
    if (typeof value === 'object') {
      video[key] = {
        height: `calc(100vh - ${toolbar[key].minHeight * 2}px - ${padding * 2}px)`,
      };
    }
  }
  return {
    root: {
      padding,
    },
    video,
  };
};

export default withStyles(styles)(Video);
