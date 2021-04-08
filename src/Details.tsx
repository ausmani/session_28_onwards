// @flow
import React, {FC} from 'react';
import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {User} from "./Interfaces";

interface Props {
    handleNext: (data:User) => void
}
const Details: FC<Props> = ({handleNext}) => {

    return (
        <Formik
            initialValues={{detail: '', email: ''}}
            validationSchema={
                Yup.object({
                    detail: Yup.string()
                        .min(3, 'Must be 3 characters or more')
                        .required('Detail is required'),
                })}
            onSubmit={(values => {
                console.log(values)
                handleNext(values)
            })}
            render={({values, setFieldValue}) => (
                <Form>

                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <TextareaAutosize aria-label="Details" rowsMin={10} placeholder="Enter Your Details"  onChange={(e)=>setFieldValue('detail',e.target.value)}/>

                            <div className="error"><ErrorMessage name="detail" /></div>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Finish
                            </Button>
                        </Grid>
                    </Grid>



                </Form>
            )}

        />



    );
};
export default Details;