import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';

import Controls from './control'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(4),
        position: 'inline-block',
        top: theme.spacing(5),
        width: 600
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popups(props) {

    const { title, children, openPopups, setOpenPopups } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopups} maxWidth="md" className="w-100"
        classes={{ paper: classes.dialogWrapper }}
        >
            <DialogTitle
             className={classes.dialogTitle}
             >
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                       
                     </Typography> 
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopups(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                    
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
                {/* <div>contentts</div> */}
            </DialogContent>
        </Dialog>
    )
}