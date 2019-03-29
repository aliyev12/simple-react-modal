import React, {Component} from 'react';
import Modal from './Modal';

class App extends Component {
    sayHello = () => {
        console.log('hey there!! ;)');
    }
    
    render() {
        const infoForModal = {
            header: 'Ohu la laaa', 
            bodyTitle: 'So coooooll', 
            bodyContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sequi atque, quo aspernatur debitis dolores sit et eos laborum dolorem quia earum, perferendis quisquam saepe at veniam repellat, beatae cumque.', 
            footer: 'Awesome footer ;)'
        }
        return (
            <>
                <Modal {...infoForModal} sayHello={this.sayHello} />
            </>
        );
    }
}

export default App;
