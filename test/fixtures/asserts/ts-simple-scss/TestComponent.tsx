import './TestComponent.scss';

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
