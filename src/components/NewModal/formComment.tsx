import * as Styles from './styles';
import * as Yup from 'yup';
import { TableComment } from './tableComment';

import {
    Formik,
    Form,
    Field,
} from 'formik';
import { usePosts } from '../../hooks/usePosts';

interface Props {
    type: 'create' | 'edit';
    continueWithModalOpen: boolean;
    setContinueWithModalOpen: (bool: boolean) => void;
    setShowSecondForm: (bool: boolean) => void;
    Notify: (msg: string, type: Noty.Type) => void;
    onRequestClose: () => void;
}

export function FormComment({
    type,
    Notify,
    continueWithModalOpen,
    onRequestClose,
    setContinueWithModalOpen,
    setShowSecondForm
}: Props) {

    const { posts, createComment, comments } = usePosts();

    const secondSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Must be a valid email'),
        body: Yup.string().required('Body is required'),
    });

    const initialValuesSecondForm = {
        name: '',
        email: '',
        body: ''
    }

    return (
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

                    const post = posts[posts.length - 1];
                    await createComment({ ...values, postId: post.id });

                    if (!continueWithModalOpen) {
                        setShowSecondForm(false);
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
                    {!!comments.find(comment => comment.postId === posts[posts.length - 1].id) ? (
                        <TableComment postId={posts[posts.length - 1].id} />
                    ) : null}
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
    )
}