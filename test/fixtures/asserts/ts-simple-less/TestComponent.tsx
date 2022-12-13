import './TestComponent.less';

interface Props {
  className?: string;
}

export const TestComponent = ({
  className = '',
}: Props): JSX.Element => {
  return (
    <div className={`${className}`}>
    </div>
  );
};
