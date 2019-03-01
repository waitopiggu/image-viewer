import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Toolbar } from '@material-ui/core';
import {
  ArrowBack, ArrowForward, CropDin, CropFree, CropPortrait,
} from '@material-ui/icons';

type Props = {
  classes: any,
  fit: string,
  handleFileChange: Function,
  handlePrefsChange: Function,
};

const Controls = ({
  classes, fit, handleFileChange, handlePrefsChange,
}: Props) => (
  <Toolbar disableGutters>
    <Grid container>
      <Grid container item xs={12} justify="center">
        <IconButton onClick={handleFileChange('previous')}>
          <ArrowBack />
        </IconButton>
        {fit === 'contain' && (
          <IconButton onClick={handlePrefsChange('fit', 'width')}>
            <CropDin />
          </IconButton>
        )}
        {fit === 'width' && (
          <IconButton onClick={handlePrefsChange('fit', 'none')}>
            <CropPortrait />
          </IconButton>
        )}
        {fit === 'none' && (
          <IconButton onClick={handlePrefsChange('fit', 'contain')}>
            <CropFree />
          </IconButton>
        )}
        <IconButton onClick={handleFileChange('next')}>
          <ArrowForward />
        </IconButton>
      </Grid>
    </Grid>
  </Toolbar>
);

const styles = theme => ({
});

export default withStyles(styles)(Controls);
