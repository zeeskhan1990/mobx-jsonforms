import * as React from 'react';
import {
  ControlElement,
  Helpers
} from '../../core';
import {Button ,Toolbar ,Tooltip ,Typography , Grid }from '@material-ui/core';



import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { ValidationIcon } from './ValidationIcon';

export const TableToolbar = (
  {
    errors,
    childErrors,
    label,
    uischema,
    numSelected,
    openConfirmDeleteDialog,
    addItem,
    path
  }
) => {
  const controlElement = uischema as ControlElement;
  const labelObject = Helpers.createLabelDescriptionFrom(controlElement);
  const allErrors = [].concat(errors).concat(childErrors.map(e => e.message));


  return (
    <Toolbar hidden={true}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item>
          <Typography variant='title'>{label}</Typography>
        </Grid>
        <Grid item>
          <ValidationIcon id='tooltip-validation' errorMessages={allErrors}/>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Tooltip id='tooltip-add' title={`Add to ${labelObject.text}`} placement='bottom'>
                <Button
                  variant={'fab'}
                  color='primary'
                  aria-label={`Add to ${labelObject.text}`}
                  onClick={addItem(path)}
                >
                  <AddIcon/>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title='Delete'>
                <Button
                  variant={'fab'}
                  aria-label={`Delete`}
                  disabled={numSelected === 0}
                  onClick={openConfirmDeleteDialog}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

/*
  return (
    <Toolbar hidden={true}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item>
          <Typography variant='title'>{label}</Typography>
        </Grid>
        <Grid item hidden={{smUp: allErrors.length === 0}}>
          <ValidationIcon id='tooltip-validation' errorMessages={allErrors}/>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Tooltip id='tooltip-add' title={`Add to ${labelObject.text}`} placement='bottom'>
                <Button
                  variant={'fab'}
                  color='primary'
                  aria-label={`Add to ${labelObject.text}`}
                  onClick={addItem(path)}
                >
                  <AddIcon/>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title='Delete'>
                <Button
                  variant={'fab'}
                  aria-label={`Delete`}
                  disabled={numSelected === 0}
                  onClick={openConfirmDeleteDialog}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};
*/