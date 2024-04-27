/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
    const content = (
        <div
            className={`modal ${props.className}`}
            style={props.style}>
            <header className={`modal-header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            <form
                onSubmit={
                    props.onSubmit
                        ? props.onSumbit
                        : (event) => event.preventDefault()
                }>
                <div className={`modal-content ${props.contentClass}`}>
                    {props.children}
                </div>

                <footer className={`modal-footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("modal-hook")
    );
};

const Modal = (props) => {
    return (
        <Fragment>
            {props.showModal && <Backdrop onClick={props.onCancel} />}

            <CSSTransition
                in={props.showModal}
                timeout={200}
                classNames="modal"
                mountOnEnter
                unmountOnExit>
                <ModalOverlay {...props} />
            </CSSTransition>
        </Fragment>
    );
};

export default Modal;
