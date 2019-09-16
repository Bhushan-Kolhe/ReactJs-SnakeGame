import React, { PureComponent } from 'react'

export default class game extends PureComponent {

    render() {

        if(this.props.isPlaying){
            const script = document.createElement("script");
            script.src = "snake.js";
            script.async = true;
            document.body.appendChild(script);
            return (
                <div className="container">
                    <div className="CanvasCollection"></div>
                 </div>
            )
        } else {
            return "";
        }
    }
}
