import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

import { usePosts } from '../../hooks/usePosts';
import { useEffect, useState } from 'react';

interface Props {
    continueWithModalOpen: boolean;
    showSecondForm: boolean;
    postId: number;
    setContinueWithModalOpen: (bool: boolean) => void;
    setShowSecondForm: (bool: boolean) => void;
    Notify: (msg: string, type: Noty.Type) => void;
    onRequestClose: () => void;
}

export function FormPost({
    Notify,
    setShowSecondForm,
    showSecondForm,
    continueWithModalOpen,
    onRequestClose,
    setContinueWithModalOpen,
    postId
}: Props) {
    const { createPost, posts, editPost } = usePosts();

    const valuesFirstForm = {
        title: !!posts.find(post => post.id === postId) ? posts.find(post => post.id === postId)?.title : '',
        body: !!posts.find(post => post.id === postId) ? posts.find(post => post.id === postId)?.body : '',
    }


    const firstSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        body: Yup.string().required('Body is required'),
    });

    return (
        <Formik
            initialValues={valuesFirstForm}

            onSubmit={async (values, actions) => {
                const isValid = await firstSchema.isValid(values);

                if (!isValid) {
                    firstSchema.validate(values).catch((reason: Yup.ValidationError) => {
                        reason.errors.forEach(msg => {
                            Notify(msg, 'error');
                        });
                    });
                    setShowSecondForm(!showSecondForm);
                    return;
                }

                if (postId === 0) {
                    await createPost({
                        title: values.title ? values.title : '',
                        body: values.body ? values.body : '',
                    });
                } else {
                    await editPost({
                        title: values.title ? values.title : '',
                        body: values.body ? values.body : '',
                    }, postId);
                }
                if (!continueWithModalOpen) {
                    onRequestClose();
                } else {
                    if (!showSecondForm) {
                        actions.resetForm();
                    }
                }
            }}
        >
            <Form>
                <Field
                    type="text"
                    placeholder="Title*"
                    name="title"
                    id="first_form_title"
                />
                <Field
                    type="text"
                    placeholder="Body*"
                    name="body"
                />
                <div>
                    <button onClick={async () => {
                        setContinueWithModalOpen(true);
                        setShowSecondForm(!showSecondForm);
                    }}
                        type={!showSecondForm ? 'button' : 'submit'}
                    >
                        {!showSecondForm ? 'Add comment' : (postId === 0 ? 'Add new post' : 'Edit post')}
                    </button>
                </div>
                {!showSecondForm ? (
                    <footer>
                        <button
                            className="close"
                            type="button"
                            onClick={onRequestClose}
                        >
                            Close
                        </button>

                        <button
                            className="save"
                            type="submit"
                            onClick={() => setContinueWithModalOpen(false)}
                        >
                            Save
                        </button>

                        <button
                            className="save_continue"
                            type="submit"
                            onClick={() => setContinueWithModalOpen(true)}
                        >
                            Save and Continue
                        </button>
                    </footer>
                ) : null}
            </Form>
        </Formik>
    )
}