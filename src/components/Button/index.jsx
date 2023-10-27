import './Button.css';

import { forwardRef } from 'react';

const Button = forwardRef(({
  className = '',
  children,
  ...buttonProps
}, ref) => (
    <button ref={ref} {...buttonProps} className={`Button ${className ?? ''}`}>
      {children}
    </button>
));

export default Button;