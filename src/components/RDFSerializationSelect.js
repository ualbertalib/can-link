import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import { HEADER_MAPPING } from '../constants'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },


    
}));

const selectValues = Object.keys(HEADER_MAPPING)

export default function RDFSerializationSelect({serialization = "XML", handleSerializationChange, style}) {

    //const [serialization, setSerialization] = React.useState('XML');
    const classes = useStyles();

    const handleChange = (event) => {
        handleSerializationChange(event.target.value);
    };

    return (
        <Box p={1} style={style}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Serialization</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={serialization}
                    onChange={handleChange}
                    label="Serialization"
                >
                    {selectValues.map(val => <MenuItem value={val}><Box style={{ color: 'grey' }}>{val}</Box></MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}