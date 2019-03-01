import React from 'react';
import { isEqual } from 'lodash';
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

class Image extends React.PureComponent<Props> {

  imgRef = React.createRef();

  componentDidMount() {
    this.imgRef.current.addEventListener('contextmenu', this.onRightClick);
  }

  componentDidUpdate() {
    const element = document.getElementById('viewer-image-container');
    element.scrollTop = 0;
    element.scrollLeft = 0;
  }

  componentWillUnmount() {
    this.imgRef.current.removeEventListener('contextmenu', this.onRightClick);
  }

  handleFileChange = direction => () => {
    const { nextFile } = this.props;
    nextFile(direction);
  };

  handlePrefsChange = (name, value) => () => {
    const { setImagePrefs } = this.props;
    setImagePrefs({ [name]: value });
  };

  onClick = () => {
    const { nextFile } = this.props;
    nextFile('next');
  };

  onRightClick = () => {
    const { nextFile } = this.props;
    nextFile('previous');
  };

  render() {
    const { classes, contentClass, file, imagePrefs } = this.props
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
              fit === 'contain' && classes.fitContain,
              fit === 'width' && classes.fitWidth,
            ])}
            onClick={this.onClick}
            ref={this.imgRef}
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
    margin: 'auto',
  },
  imageContainer: {
    height: '100%',
    overflow: 'auto',
  },
});

export default withStyles(styles)(Image);
