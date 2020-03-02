import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function WorkoutEdit(props) {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:3001/api/log/${props.workoutUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify(),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => {
                props.fetchWorkouts();
                props.updateOff();
            })
    }
    return (
        <>
            <Modal isOpen={true}>
                <ModalHeader>Log a Workout</ModalHeader>
                <ModalBody>
                    <Form onSubmit={workoutUpdate}>
                        <FormGroup>
                            <Label htmlFor='result'>Edit Result</Label>
                            <Input name="result" value={editRes} onChange={e => setEditRes(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='description'>Edit Description</Label>
                            <Input name="description" value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='definition'>Edit Definition</Label>
                            <Input type="select" name="definition" value={editDef} onChange={e => setEditDef(e.target.value)}>
                                <option></option>
                                <option value="Time">Time</option>
                                <option value="Weight">Weight</option>
                                <option value="Distance">Distance</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
}