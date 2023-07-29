import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import axios from 'axios';

function CreatePost() {
    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/posts", data).then((response) => {
            console.log("Post request worked!")
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    });

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreatePost" name="title" placeholder="(Ex. Title)" />
                    <label>Post text: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="inputCreatePost" name="postText" placeholder="(Ex. Got a promotion at work!)" />
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreatePost" name="username" placeholder="(Ex. Charlie)" />
                    <button type="submit">Post</button>
                </Form>

            </Formik>
        </div>
    );
}

export default CreatePost