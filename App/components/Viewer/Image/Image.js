import React from 'react';
import classNames from 'classnames';
import { Grid, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Controls from './Controls';

type Props = {
  classes: any,
  contentClass: any,
  file: any,
  imagePrefs: any,
  nextFile: Function,
  setImagePrefs: Function,
};

type State = {
  clientX: number,
  clientY: number,
  containerEl: any,
  grabbed: boolean,
};

class Image extends React.Component<Props, State> {

  state = {
    clientX: 0,
    clientY: 0,
    containerEl: null,
    grabbed: false,
  };

  componentDidMount() {
    const containerEl = document.getElementById('viewer-image-container');
    this.setState({ containerEl });
  }

  componentDidUpdate(prevProps) {
    if (this.props.file.filename !== prevProps.file.filename) {
      const { containerEl } = this.state;
      containerEl.scrollTop = 0;
      containerEl.scrollLeft = 0;
    }
  }

  handleFileChange = direction => () => {
    const { nextFile } = this.props;
    nextFile(direction);
  };

  handlePrefsChange = (name, value) => () => {
    const { setImagePrefs } = this.props;
    setImagePrefs({ [name]: value });
  };

  onMouseDown = (event) => {
    const { clientX, clientY } = event;
    this.setState({ clientX, clientY, grabbed: true });
  };

  onMouseMove = (event) => {
    const { containerEl, grabbed } = this.state;
    if (grabbed) {
      const { clientX, clientY, containerEl } = this.state;
      const { clientHeight, clientWidth, scrollTop, scrollLeft } = containerEl;
      containerEl.scrollTop += (clientY - event.clientY);
      containerEl.scrollLeft += (clientX - event.clientX);
      this.setState({ clientX: event.clientX, clientY: event.clientY });
    }
  };

  onMouseUp = (event) => {
    this.setState({ grabbed: false });
  };

  render() {
    const { classes, contentClass, file, imagePrefs } = this.props
    const { grabbed } = this.state;
    const { fit, overflowX } = imagePrefs;
    const fitNone = fit === 'none';
    const fitWidth = fit === 'width';
    return (
      <div className={contentClass}>
        <Grid
          container
          id="viewer-image-container"
          alignItems={fitNone || fitWidth ? 'flex-start' : 'center'}
          justify={fitNone ? 'flex-start' : 'center'}
          className={classes.imageContainer}
        >
          <img
            className={classNames([
              classes.image,
              grabbed && classes.imageGrabbed,
              fit === 'contain' && classes.fitContain,
              fit === 'width' && classes.fitWidth,
            ])}
            draggable={false}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.onMouseUp}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            src={file.path}
          />
        </Grid>
        <Controls
          fit={fit}
          handleFileChange={this.handleFileChange}
          handlePrefsChange={this.handlePrefsChange}
        />
      </div>
    );
  }
}

const styles = theme => ({
  fitContain: {
    objectFit: 'scale-down',
    width: '100%',
    height: '100%',
  },
  fitWidth: {
    width: '100%',
  },
  image: {
    cursor: 'grab',
    margin: 'auto',
  },
  imageContainer: {
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  imageGrabbed: {
    cursor: 'grabbing',
  },
});

export default withStyles(styles)(Image);
