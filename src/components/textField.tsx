import { TextField } from '@material-ui/core'
import { useField } from 'formik'
import React, { Fragment } from 'react'



interface InputTextFieldProps{
    name: string
    label: string
    type: string

}

const InputTextField: React.FC<InputTextFieldProps> = (props) => {

    const [field, {error}] = useField(props)
    return (
        <Fragment>
            <TextField
            error={!!error}
            helperText={error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={props.name}
            label={props.label}
            type={props.type}
            id={field.name}
            {...field}
            {...props}
          />
        </Fragment>
    )
}


export default InputTextField