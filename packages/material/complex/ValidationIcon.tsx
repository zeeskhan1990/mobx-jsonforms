
import * as React from 'react';

import {Badge,Tooltip }from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


export const ValidationIcon = ({id, errorMessages}) => (
    <Tooltip
        id={id}
        title={errorMessages.map((e, idx) => <div key={`${id}_${idx}`}>{e}</div>)}
    >
        <Badge badgeContent={errorMessages.length}>
            <ErrorOutlineIcon color='error'/>
        </Badge>
    </Tooltip>
);
