import React from 'react';
import classNames from 'classnames';
import { Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: any,
  contentClass: any,
  file: any,
  nextFile: Function,
};

class Image extends React.PureComponent<Props> {

  imgRef: null;

  componentDidMount() {
    this.imgRef.addEventListener('contextmenu', this.onRightClick);
  }

  componentWillUnmount() {
    this.imgRef.removeEventListener('contextmenu', this.onRightClick);
  }

  onClick = () => {
    const { nextFile } = this.props;
    nextFile('next');
  };

  onRightClick = () => {
    const { nextFile } = this.props;
    nextFile('previous');
  };

  render() {
    const { classes, contentClass, file } = this.props
    return (
      <div className={contentClass}>
        <img
          className={classes.image} src={file.path}
          onClick={this.onClick}
          ref={ref => this.imgRef = ref}
        />
        <Toolbar />
      </div>
    );
  }
}

const styles = theme => ({
  image: {
    objectFit: 'scale-down',
    height: '100%',
    width: '100%',
  },
});

export default withStyles(styles)(Image);
