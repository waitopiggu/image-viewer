import React from 'react';
import { isEqual } from 'lodash';
import Controls from './Controls';

type Props = {
  classes: any,
  contentClass: any,
  file: any,
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
    const { nextFile } = this.props;
    nextFile(direction);
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
    const { classes, contentClass, file, videoPrefs } = this.props;
    return (
      <React.Fragment>
        <video
          className={contentClass}
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
      </React.Fragment>
    );
  }
}

export default Video;
