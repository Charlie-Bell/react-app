import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import axios from 'axios';

function CreatePost() {
    const initialValues = {
        comment: ""
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/posts", data).then((response) => {
            console.log("Post request worked!")
        });
    };

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required()
    });

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Comment: </label>
                    <ErrorMessage name="comment" component="span" />
                    <Field id="inputCreatePost" as="textarea" name="comment" placeholder="(Ex. Comment)" />
                    <button type="submit">Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost