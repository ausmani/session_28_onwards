// @flow 
import React, {FC} from 'react';
import {Formik,  Form, ErrorMessage} from 'formik';
import {TextField} from "@material-ui/core";
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {User} from "./Interfaces";
interface Props {
    handleNext: (data:User) => void
}

const PersonalInfo: FC<Props> = ({handleNext}) => {

    return (
        <Formik
            initialValues={{first_name: '', last_name: '', gender: 'male'}}
            validationSchema={
                Yup.object({
                first_name: Yup.string()
                    .min(3, 'Must be 3 characters or more')
                    .max(15, 'Must be 15 characters or less')
                    .required('First name is required'),
                last_name:Yup.string().min(3,'Must be 3 characters or more').max(15, 'Must be 15 characters or less').required("Last name is required"),
                })}
            onSubmit={(values => {
                    console.log(values)
                handleNext(values)
            })}
            render={({values, setFieldValue}) => (
                <Form>

                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TextField name="first_name" label="First Name" onChange={(e)=>setFieldValue('first_name',e.target.value)} />
                                <div className="error"><ErrorMessage name="first_name" /></div>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField name="last_name" label="Last Name"  onChange={(e)=>setFieldValue('last_name',e.target.value)}/>
                                <div className="error"><ErrorMessage name="last_name" /></div>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.gender}
                                        onChange={(e)=>setFieldValue('gender',e.target.value)}
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Male</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Next
                                    </Button>
                            </Grid>
                        </Grid>



                </Form>
            )}

        />



    );
};
export default PersonalInfo;