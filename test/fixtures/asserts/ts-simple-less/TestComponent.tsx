import './TestComponent.less';

interface Props {
    text: string;
}

export const TestComponent = ({
  text,
}: Props): JSX.Element => {
  return (
    <div>
      {text}
    </div>
  );
};
