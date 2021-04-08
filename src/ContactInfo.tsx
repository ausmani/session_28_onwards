// @flow
import React, {FC} from 'react';
import {Formik, Form, ErrorMessage} from 'formik';
import {TextField} from "@material-ui/core";
import * as Yup from 'yup';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {User} from "./Interfaces";
interface Props {
    handleNext: (data:User) => void
}
const ContactInfo: FC<Props> = ({handleNext}) => {

    return (
        <Formik
            initialValues={{contact_num: '', email: ''}}
            validationSchema={
                Yup.object({
                    contact_num: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .max(15, 'Must be 15 characters or less')
                        .required('First name is required'),
                    email:Yup.string().email("Must be a valid Email").required("Email is required"),
                })}
            onSubmit={(values => {
                console.log(values)
                handleNext(values)
            })}
            render={({values, setFieldValue}) => (
                <Form>

                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <TextField name="email" label="Email" onChange={(e)=>setFieldValue('email',e.target.value)} />
                            <div className="error"><ErrorMessage name="email" /></div>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField name="contact_num" label="Phone Number"  onChange={(e)=>setFieldValue('contact_num',e.target.value)}/>
                            <div className="error"><ErrorMessage name="contact_num" /></div>
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
export default ContactInfo;