import styled from 'styled-components';

export const Container = styled.main`
    margin-top: 4rem;
`;

export const SubColumn = styled.td`
    padding: 1rem 1.25rem;

    &:last-child{
        /* display:flex; */
        margin: auto;
    }

    div{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.25rem;

        @media(max-width: 900px){
            grid-template-columns: 1fr;
        }
    }

    button{
        font-size: 1rem;
        border:0;
        padding: 0 1rem;
        border-radius: 0.25rem;
        height: 2rem;
        color: #FFF;
        background: var(--green);

        &:last-child{
            color: #FFF;
            background: var(--red);
        }

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
    }
`;
