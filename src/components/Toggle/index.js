import React, {PropTypes} from 'react'

import styles from './index.css'

class Toggle extends React.Component {

    static propTypes = {
        initialToggledOn: PropTypes.bool,
        onToggle: PropTypes.func,
        children: PropTypes.any
    }

    handleToggleClick() {
        const toggledOn = !this.state.toggledOn
        this.props.onToggle(toggledOn)
        this.setState({toggledOn});
    }

    constructor(props) {
        super(props)
        this.state = {
            toggledOn: props.initialToggledOn || false
        }
    }

    render() {
        const onOff = this.state.toggledOn ? 'on' : 'off'
        const toggledClassName = `toggle--${onOff}`
        return (
            <div className={`toggle ${toggledClassName}`}>
                <span className={styles.label}>Hey Benjamin ! </span>
                <button
                    onClick={() => this.handleToggleClick()}
                    >
                    {this.props.children}
                </button>
            </div>
        )
    }
}

export default Toggle
