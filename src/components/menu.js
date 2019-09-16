import React, { PureComponent } from 'react'

export default class menu extends PureComponent {

    playGame = () => {
        const Menu = document.querySelector('.Menu');
        this.props.setPlaying();
        Menu.className += ' hidden';
    }

    render() {
        return (
            <div className="Menu">
                <div className="Menu-Items">
                <h3> SNAKE GAME </h3>
                <button className="PlayBtn" onClick={this.playGame} > PLAY </button>
                </div>
            </div>
        )
    }
}
