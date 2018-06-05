
import * as React from 'react';
import * as _ from 'lodash';
import {
  mapUpdateActionToTableControlProps,
  mapStoreValuesToTableControlProps,
  TableControlProps
} from '../../core';
import {RendererComponent, createPropsForItem } from '../../react';
import { TableToolbar } from './TableToolbar';
import { MaterialTableControl } from './MaterialTableControl';
import  {Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,Button 
} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export class MaterialArrayControlRenderer extends RendererComponent<TableControlProps, TableState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.createSelection(false),
      openConfirmDelete: false
    };
  }

  render() {
    const { visible } = this.props;
    const numSelected = this.state.selected ? _.filter(this.state.selected, v => v).length : 0;
    const tableProps = {
      selectAll: this.selectAll,
      select: this.select,
      isSelected: this.isSelected,
      numSelected,
      ...this.props
    };

    const toolbarProps = {
      openConfirmDeleteDialog: this.openConfirmDeleteDialog,
      numSelected,
      ...this.props
    };
    const selectedCount = _.filter(this.state.selected, v => v).length;

    return (
      <Grid container direction='column' spacing={0}>
        <Grid item>
          <TableToolbar {...toolbarProps}/>
        </Grid>
        <Grid item>
          <MaterialTableControl {...tableProps}/>
        </Grid>
        <Dialog
          open={this.state.openConfirmDelete}
          keepMounted
          onClose={this.closeConfirmDeleteDialog}
          aria-labelledby='alert-dialog-confirmdelete-title'
          aria-describedby='alert-dialog-confirmdelete-description'
        >
          <DialogTitle id='alert-dialog-confirmdelete-title'>
            {'Confirm Deletion'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-confirmdelete-description'>
              Are you sure you want to delete the {selectedCount} selected objects?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDeleteDialog} color='primary'>
              No
            </Button>
            <Button onClick={this.confirmDelete} color='primary'>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );

    /*
          <Grid container direction='column' hidden={{ xsUp: !visible }} spacing={0}>
        <Grid item>
          <TableToolbar {...toolbarProps}/>
        </Grid>
        <Grid item>
          <MaterialTableControl {...tableProps}/>
        </Grid>
        <Dialog
          open={this.state.openConfirmDelete}
          keepMounted
          onClose={this.closeConfirmDeleteDialog}
          aria-labelledby='alert-dialog-confirmdelete-title'
          aria-describedby='alert-dialog-confirmdelete-description'
        >
          <DialogTitle id='alert-dialog-confirmdelete-title'>
            {'Confirm Deletion'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-confirmdelete-description'>
              Are you sure you want to delete the {selectedCount} selected objects?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDeleteDialog} color='primary'>
              No
            </Button>
            <Button onClick={this.confirmDelete} color='primary'>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );*/
  }

  private select = (_event, index) => {
    const copy = this.state.selected.slice();
    copy[index] = !copy[index];

    this.setState({ selected: copy });
  }
  private selectAll = (_event, checked) => {
    if (checked) {
      this.setState({ selected: this.createSelection(true) });
      return;
    }
    this.setState({selected: this.createSelection(false) });
  }
  private closeConfirmDeleteDialog = () => {
    this.setState({ openConfirmDelete: false });
  }
  private openConfirmDeleteDialog = () => {
    this.setState({ openConfirmDelete: true });
  }
  private confirmDelete = () => {
    const selectedIndices = this.state.selected;
    const toDelete = selectedIndices.reduce(
      (acc, value, index) => {
        if (value) {
          acc.push(this.props.data[index]);
        }
        return acc;
      },
      []
    );
    this.props.removeItems(this.props.path, toDelete)();
    this.closeConfirmDeleteDialog();
    this.setState({ selected: this.createSelection(false) });
  }
  private isSelected = index => {
    return this.state.selected[index];
  }
  private createSelection = (selected: boolean) => _.fill(Array(this.props.data.length), selected);
}

export interface TableState {
  /**
   * Represents the selected entries of the array.
   */
  selected: boolean[];

  /**
   * Determines whether the confirm deletion dialog is opened.
   */
  openConfirmDelete: boolean;
}

@inject("jsonFormsStore")
@observer
export default class MaterializedArrayControlRenderer extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToTableControlProps, mapUpdateActionToTableControlProps)
    return (
      <MaterialArrayControlRenderer {...effectiveProps}/>
    )
  }
}