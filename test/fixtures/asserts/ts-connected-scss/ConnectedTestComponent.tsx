import { connect } from 'react-redux';
import { TestComponent } from './TestComponent';

const mapState = (state) => ({});

const mapDispatch = {};

export const connector = connect(mapState, mapDispatch);

export const ConnectedTestComponent = connect(mapState, mapDispatch)(TestComponent);
