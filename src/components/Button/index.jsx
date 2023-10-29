import './Button.css';

const Button = ({children, onClickFunction, className}) => {
    const customClass = className === undefined  ? '' : className;
    return (
        <button className={`Button ${customClass}`} onClick={onClickFunction}>{children}</button>
    )
}

export default Button;