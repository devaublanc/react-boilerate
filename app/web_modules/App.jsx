import React from 'react';
import Example from 'Example';
import Toggle from 'Toggle/Toggle';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Example />
                <Toggle onToggle={(toggle) => {alert('prout ' + toggle)}}>
                    Hahaha
                </Toggle>
            </div>
        );
    }
}
