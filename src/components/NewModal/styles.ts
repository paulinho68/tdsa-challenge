import styled from 'styled-components';

export const Container = styled.div`
    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input{
        width: 100%;
        padding: 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        border: 1px solid #D7D7D7;
        background: #E7E9EE;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder{
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }
    }

    footer{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.25rem;

        button[type="submit"]{
            width: 100%;
            padding: 0.25rem 1rem;
            color: #FFF;
            border-radius: 0.25rem;
            border:0;
            font-size:1rem;
            font-weight:600;
            margin-top: 3rem;

            transition: filter 0.2s;

            &:hover{
                filter: brightness(0.9);
            }

            &.close{
                background: var(--red);
            }
            &.save{
                background: var(--green);
            }
            &.save_continue{
                background: var(--blue-light);
            }
        }
    }

`;