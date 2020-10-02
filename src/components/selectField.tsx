import { InputLabel, Select, FormControl, MenuItem, makeStyles, FormHelperText } from '@material-ui/core'
import { useField } from 'formik'
import React, { Fragment } from 'react'

interface SelectFieldProps {
    communities: selectCommunity[],
    name: string,
    label: string,
}

interface selectCommunity{
    id: number
    name: string
}

const useStyles = makeStyles((theme) => ({
    select: {
        minWidth: 240,
    }
}))



const SelectField: React.FC<SelectFieldProps> = (props) => {
    const classes = useStyles()
    const [field, {error}] = useField(props)
    return (
        <Fragment>
            <FormControl className={classes.select}>
                <InputLabel>{props.label}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id={field.name}
                error={!!error}
                required
                name={props.name}
                {...field}
                {...props}
                >
                    {
                        props.communities.map(comm => (
                            <MenuItem value={comm.id} key={comm.id} >{comm.name}</MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </Fragment>
    )
}


export default SelectField