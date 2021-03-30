import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

import { usePosts } from '../../hooks/usePosts';

interface Props {
    continueWithModalOpen: boolean;
    showSecondForm: boolean;
    setContinueWithModalOpen: (bool: boolean) => void;
    setShowSecondForm: (bool: boolean) => void;
    Notify: (msg: string, type: Noty.Type) => void;
    onRequestClose: () => void;
}

const initialValuesFirstForm = {
    title: '',
    body: ''
}

const firstSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
});

export function FormPost({
    Notify,
    setShowSecondForm,
    showSecondForm,
    continueWithModalOpen,
    onRequestClose,
    setContinueWithModalOpen
}: Props) {
    const { createPost } = usePosts();

    return (
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
                        {!showSecondForm ? 'Add comment' : 'Add new post'}
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