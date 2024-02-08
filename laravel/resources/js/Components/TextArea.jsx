import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea(
  { type = 'text', className = '', isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      type={type}
      className={
        'pl-4  border-black focus:border-indigo-100 focus:ring-indigo-500 rounded-md shadow-sm ' +
        className
      }
      ref={input}
    />
  );
});
