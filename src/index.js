import React from 'react';
import PropTypes from 'prop-types';

export const createReactComponent = ElmComponent => props => (
    <Elm
        component={ElmComponent}
        elmProps={props}
    />
)

const filterObject = (predicate, object) => {
    return Object.entries(object).reduce((accum, pair) => {
        if (predicate(pair[1])) {
            return { ...accum, [pair[0]]: pair[1] };
        } else {
            return accum;
        }
    }, {});
};

class Elm extends React.Component {
    componentDidMount() {
        const { component, elmProps } = this.props;

        this.app = component.Elm.Main.init({
            node: this.node,
            flags: { props: elmProps }
        });

        const commandPorts = filterObject(
            port => !!port.subscribe,
            this.app.ports
        );

        this.commandSubscriptions = Object.entries(commandPorts).map(([portName, port]) => {
            port.subscribe(dataFromElm => {
                if (!!this.props.elmProps[portName]) {
                    this.props.elmProps[portName](dataFromElm);
                }
            });

            return port.unsubscribe;
        });
    }

    componentDidUpdate() {
        this.app.ports.propsUpdated.send(this.props.elmProps);
    }

    componentWillUnmount() {
        this.commandSubscriptions.forEach(unsubscribe => {
            unsubscribe();
        });
    }

    render() {
        return (
            <div>
                <div ref={this.storeNode} />
            </div>
        );
    }

    storeNode = node => {
        this.node = node;
    }
}

Elm.propTypes = {
    component: PropTypes.object.isRequired,
    elmProps: PropTypes.object.isRequired
};
