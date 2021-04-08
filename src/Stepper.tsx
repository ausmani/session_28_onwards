import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import Details from "./Details";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";
import {User} from "./Interfaces";


function getSteps() {
    return ['Step 1 : Personal Info', 'Step 2 : Contact Info', 'Step 3 : Details'];
}


function getStepContent(stepIndex: number, handleNext: (data: User) => void) {
    switch (stepIndex) {
        case 0:
            return <PersonalInfo handleNext={handleNext}/>;
        case 1:
            return <ContactInfo handleNext={handleNext}/>;
        case 2:
            return <Details handleNext={handleNext}/>;
        default:
            return 'Unknown stepIndex';
    }
}

export default function StepperComponent() {
    const initialUserState = {first_name: '', last_name: '', contact_num: '', email: '', detail: ''};
    const [user, updateUser] = useState(initialUserState);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [users, setUsers] = useState<User[]>([])
    const handleNext = (data: User) => {
        if (activeStep===0){
            updateUser(initialUserState)
        }
        let userState = {...user}
        if (data.first_name !== undefined && data.last_name !== undefined) {
            userState.first_name = data.first_name;
            userState.last_name = data.last_name;
        }
        if (data.contact_num !== undefined && data.email !== undefined) {
            userState.contact_num = data.contact_num;
            userState.email = data.email;
        }
        if (data.detail !== undefined) {
            userState.detail = data.detail;
        }
        updateUser(userState);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);


    };

    const handleReset = () => {
        setActiveStep(0);
        let newUser = [...users,user];
        setUsers(newUser);
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <div>All steps completed. Record Added</div>
                        <Button variant="contained" color="primary" onClick={handleReset}>Go Back</Button>
                    </div>
                ) : (
                    <div>
                        <div
                        >{getStepContent(activeStep, handleNext)}</div>
                    </div>
                )}
            </div>

            {users.length > 0 ? (<div>
                <h3>Previous Records Added</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email Address</TableCell>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>Details</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row, ind) => {
                                return (
                                    <TableRow key={ind}>
                                        <TableCell component="th" scope="row">
                                            {row.first_name}
                                        </TableCell>
                                        <TableCell>{row.last_name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.contact_num}</TableCell>
                                        <TableCell>{row.detail}</TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>):''}


        </div>
    );
}
