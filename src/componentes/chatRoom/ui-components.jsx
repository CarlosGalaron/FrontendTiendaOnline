import styled from 'styled-components';

const UlMensajes = styled.ul`
    max-width: 800px;
    margin: 10px auto;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const LiMensaje = styled.li`
    background-color: ${(props) => (props.isOwnMessage ? 'red' : 'lightblue')};
    border: 2px solid ${(props) => (props.isOwnMessage ? 'darkred' : 'dodgerblue')};
    padding: 10px 20px;
    color: ${(props) => (props.isOwnMessage ? 'white' : 'black')};
`;

export {
    UlMensajes, LiMensaje
}
