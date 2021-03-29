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

interface Props {
    isOpen: boolean;
    type: 'create' | 'edit';
    onRequestClose: () => void;
}

export function NewModal({ isOpen, onRequestClose, type }: Props) {
    const { createPost } = usePosts();

    const initialValuesFirstForm = {
        title: '',
        body: ''
    }

    const firstSchema = Yup.object({
        title: Yup.string().required('Title is required'),
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
                                    new Noty({
                                        text: msg,
                                        type: 'error',
                                        timeout: 4000,
                                        progressBar: true
                                    }).show();
                                });
                            });
                            return;
                        }

                        await createPost(values);
                        onRequestClose();
                    }}
                >
                    <Form>
                        <Field
                            type="text"
                            placeholder="Title"
                            name="title"
                        />
                        <Field
                            type="text"
                            placeholder="Body"
                            name="body"
                        />
                        <footer>
                            <button className="close" type="submit">Close</button>
                            <button className="save" type="submit">Save</button>
                            <button className="save_continue" type="submit">Save and Continue</button>
                        </footer>
                    </Form>
                </Formik>
            </Styles.Container>
        </Modal >
    )
}