import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.modalContent = React.createRef();

        this.state = {
            modalDisplay: 'none',
            styles: {
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            },
            pos1: 0,
            pos2: 0,
            pos3: 0,
            pos4: 0,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleModalContentOnMouseDown = this.handleModalContentOnMouseDown.bind(
            this
        );
        this.closeDragElement = this.closeDragElement.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.closeModal, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeModal, false);
    }

    openModal() {
        this.setState({modalDisplay: 'block'});
    }

    closeModal(e) {
        if (
            e.target.className === 'closeBtn' ||
            e.target.className === 'modal'
        ) {
            this.setState({modalDisplay: 'none'});
        }
    }

    handleModalContentOnMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.setState({
            pos3: e.clientX,
            pos4: e.clientY,
        });
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }

    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.setState(state => {
            return {
                pos1: state.pos3 - e.clientX,
                pos2: state.pos4 - e.clientY,
                pos3: e.clientX,
                pos4: e.clientY,
            };
        });

        // set the element's new position:
        const styles = {
            ...this.state.styles,
            top: this.modalContent.current.offsetTop - this.state.pos2 + 'px',
            left: this.modalContent.current.offsetLeft - this.state.pos1 + 'px',
        };

        this.setState({styles});
    }

    render() {
        const { header, bodyTitle, bodyContent, footer, sayHello } = this.props;
        return (
            <>
                <button
                    id="modalBtn"
                    className="button"
                    onClick={this.openModal}
                >
                    Click Here
                </button>

                <div
                    id="simpleModal"
                    className="modal"
                    style={{ display: this.state.modalDisplay }}
                >
                    <div 
                    ref={this.modalContent}
                    className="modal-content"
                    style={this.state.styles}
                    >
                        <div
                            className="modal-header"
                            onMouseDown={this.handleModalContentOnMouseDown}
                        >
                            <div className="header">
                                <h3>{header}</h3>
                            </div>
                            <div className="buttonContainer">
                                <button
                                    className="closeBtn"
                                    type="button"
                                    onClick={this.closeModal}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <p><strong>{bodyTitle}</strong></p>
                            <p>
                                {bodyContent}
                            </p>
                            <button className="button" onClick={sayHello}>Say Hello!</button>
                        </div>
                        <div className="modal-footer">
                            <h3>{footer}</h3>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Modal.defaultProps = {
    header: 'Header', 
    bodyTitle: 'Body Title', 
    bodyContent: 'Body Content', 
    footer: 'Footer'
};

export default Modal;
