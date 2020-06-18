import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography/Typography";
import {makeStyles} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles({
    root: {
      width: `100% !important`
    },
    paper: {
        width: `100% !important`
    },
    titleRoot: {
        backgroundColor: `#FFFFFF !important`,
        //margin: '10px',
        //width: '90%'
    },
    contentRoot: {
        backgroundColor: `#FFFFFF !important`,
        margin: '10%',
    },
    footerRoot: {
        backgroundColor: `#FFFFFF !important`,
        textAlign: `center !important`
    }
});

export default function MainDialog(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.handleDialogClose();
    };

    return (
        <div>
            <Dialog
                open={props.states}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{
                    paper: classes.root,
                    root: classes.root
                }}
            >
                {
                    props.title ? (
                        <DialogTitle
                            className="mb-2 row px-2 py-2 shadow1 w-100 text-center"
                            classes={{
                                root: classes.titleRoot
                            }}
                        >
                            <Typography
                                variant="h6"
                                className={`py-2`}
                                style={{fontSize: '20px' , margin: '0px 0px' , fontWeight: '700'}}
                            >
                                {props.title}
                            </Typography>
                        </DialogTitle>
                    )
                        : ''
                }
                <DialogContent
                    //className={`modalNew`}
                    style={{textAlign : 'center'}}
                    classes={{
                        root: classes.contentRoot
                    }}
                >
                    {props.children}
                </DialogContent>

                {
                    props.footer ? (
                            <DialogActions
                                className="row px-2 py-2 shadow1 w-100 text-center mx-auto"
                                classes={{
                                    root: classes.footerRoot
                                }}
                            >
                                {props.footer}
                            </DialogActions>
                        )
                        : ''
                }
            </Dialog>
        </div>
    );
}
