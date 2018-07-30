import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('app');
const root1 = document.getElementById('app1');
const Greating = ({ name }) => <p>Hello world! {name}</p>;

Greating.propTypes = {
    name: PropTypes.string,
};

Greating.defaultProps = {
    name: PropTypes.string,
};

const Message = React.createElement('h1', { className: 'title' }, 'Hello world');

class Welcome extends React.PureComponent {
    render() {
        const { name } = this.props;
        return (
            <span>
                <Greating {...this.props} />
                Welcome to hell {name}
            </span>
        );
    }
}

Welcome.defaultProps = {
    name: 'Stranger',
};

Welcome.propTypes = {
    name: PropTypes.string,
};

ReactDOM.render(<Welcome name="Ivan" />, root);
ReactDOM.render(Message, root1);
