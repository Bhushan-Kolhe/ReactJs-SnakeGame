import React, { PureComponent } from 'react'

export default class loader extends PureComponent {

    fadeLoader = () => {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            loader.className += ' hidden';
        });
    }

    componentDidMount() {
        this.fadeLoader();
    }

    render() {
        return (
            <div className='loader'>
                <img src="Snake_loader.gif" />
            </div>
        )
    }
}
