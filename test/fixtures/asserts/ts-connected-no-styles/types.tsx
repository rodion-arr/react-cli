import { ConnectedProps } from 'react-redux';
import { connector } from './ConnectedTestComponent';

type PropsFromRedux = ConnectedProps<typeof connector>;

export type TestComponentProps = PropsFromRedux;
