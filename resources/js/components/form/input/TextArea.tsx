import Input, { InputProps } from './InputField';

const TextArea = <T extends object>(props: InputProps<T>) => {
  return <Input<T> {...props} as={'textarea'}></Input>;
};

export default TextArea;
