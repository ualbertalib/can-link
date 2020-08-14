import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Controller} from "react-hook-form";;

function SolrSelect({control, items = [], title, defaultSelection, width}) {
 
return (
    <FormControl variant="outlined" >
        <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
        <Controller
            as={Select}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            //value={'Physics'}
            control={control}
            label={title}
            name={title}
            style={{ width: width }}
            defaultValue={'*'}
        >
            <MenuItem value="*">
                <em>{defaultSelection}</em>
            </MenuItem>
            {items.map((val)=>(<MenuItem value={val} key={val}>{val}</MenuItem>))}
        </Controller>
    </FormControl>
)
}

            export default SolrSelect