import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon, FacebookIcon, FacebookShareButton, LinkedinShareButton, LinkedinIcon } from 'react-share';

import { makeStyles } from '@material-ui/core/styles';

const shareIconProps = {
    size: '32',
    round: 'true'
  }
  
const shareTitle = "Check out my CanLink thesis finder query!";
const shareMessage = "A selection of Canadian theses, assembled by me."

const useStyles = makeStyles((theme) => ({
    shareIcons: {
      marginRight: '1em',
      marginLeft: '1em'
    },
    copyButton: {
      padding: 24
    },
    copyIcon: {
      fontSize: 32
    }
  }));

export default function Shares() {

    const classes = useStyles();

    return <Box style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }}>
        <Tooltip title="Email a link to your query">
            <EmailShareButton
                subject={shareTitle}
                body={shareMessage}
                url={window.location.href}>
                <EmailIcon {...shareIconProps} className={classes.shareIcons} />
            </EmailShareButton>
        </Tooltip>
        <Tooltip title="Share your query on twitter">
            <TwitterShareButton 
                url={window.location.href} 
                title={shareTitle} 
                hashtags={['canlink']} >
                <TwitterIcon {...shareIconProps} className={classes.shareIcons} />
            </TwitterShareButton>
        </Tooltip>
        <Tooltip title="Share your query on Facebook">
            <FacebookShareButton 
                url={window.location.href} 
                quote={shareTitle} 
                hashtag='#canlink'>
                <FacebookIcon {...shareIconProps} className={classes.shareIcons} />
            </FacebookShareButton>
        </Tooltip>
        <Tooltip title="Share your query on LinkedIn">
            <LinkedinShareButton 
                url={window.location.href} 
                title={shareTitle} 
                summary={shareMessage}>
                <LinkedinIcon {...shareIconProps} className={classes.shareIcons} />
            </LinkedinShareButton>
        </Tooltip>
        <Tooltip title="Copy your query link to the clipboard">
            <IconButton onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <FileCopyRoundedIcon className={classes.copyIcon} />
            </IconButton>
        </Tooltip>
    </Box>
}