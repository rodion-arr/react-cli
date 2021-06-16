import './TestComponent.scss';
import { TestComponentProps } from './types';

export const TestComponent = ({ text }: TestComponentProps): JSX.Element => {
  return <div>{text}</div>;
};
