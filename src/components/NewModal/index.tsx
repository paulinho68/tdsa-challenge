import Modal from 'react-modal';
import * as Styles from './styles';
import closeImg from '../../assets/fechar.svg';
import * as Yup from 'yup';
import Noty from 'noty';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import { usePosts } from '../../hooks/usePosts';
import { useState } from 'react';

interface Props {
    isOpen: boolean;
    type: 'create' | 'edit';
    onRequestClose: () => void;
}


export function NewModal({ isOpen, onRequestClose, type }: Props) {
    const { createPost, data, createComment } = usePosts();
    const [continueWithModalOpen, setContinueWithModalOpen] = useState(false);
    const [showSecondForm, setShowSecondForm] = useState(false);

    const Notify = (text: string, type: Noty.Type) => {
        new Noty({
            text,
            type,
            timeout: 4000,
            progressBar: true
        }).show();
    }

    const initialValuesFirstForm = {
        title: '',
        body: ''
    }

    const initialValuesSecondForm = {
        name: '',
        email: '',
        body: ''
    }

    const firstSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        body: Yup.string().required('Body is required'),
    });

    const secondSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Must be a valid email'),
        body: Yup.string().required('Body is required'),
    });

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Styles.Container>
                <h2>{type === 'create' ? 'Create Post' : 'Edit Post'}</h2>
                <Formik
                    initialValues={initialValuesFirstForm}
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

                        await createPost(values);
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
                                add comment
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
                {showSecondForm ? (
                    <>
                        <Styles.Line />
                        <h2>{type === 'create' ? 'Create Comment' : 'Edit Comment'}</h2>
                        <Formik
                            initialValues={initialValuesSecondForm}
                            onSubmit={async (values, actions) => {
                                const isValid = await secondSchema.isValid(values);

                                if (!isValid) {
                                    secondSchema.validate(values).catch((reason: Yup.ValidationError) => {
                                        reason.errors.forEach(msg => {
                                            Notify(msg, 'error');
                                        });
                                    });
                                    return;
                                }

                                const post = data[data.length - 1];
                                console.log(post);
                                await createComment({ ...values, postId: post.id });

                                if (!continueWithModalOpen) {
                                    onRequestClose();
                                } else {
                                    actions.resetForm();
                                }
                            }}
                        >
                            <Form>
                                <Field
                                    type="text"
                                    placeholder="Name"
                                    name="name"

                                />
                                <Field
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                />
                                <Field
                                    type="text"
                                    placeholder="Body"
                                    name="body"
                                />
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
                            </Form>
                        </Formik>
                    </>
                ) : null}
            </Styles.Container>
        </Modal >
    )
}