import React, { FC, ButtonHTMLAttributes } from "react";

type ButtonType =
    | "is-primary"
    | "is-success"
    | "is-warning"
    | "is-error"
    | "is-disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonType;
    enabled?: boolean;
}

const Button: FC<ButtonProps> = ({
    variant = "is-primary",
    enabled = true,
    children,
    ...props
}) => {
    const classes = ["nes-btn"];

    if (!enabled) classes.push("is-disabled");

    classes.push(variant);

    return (
        <button
            type="button"
            className={classes.reduce((acc, v) => acc + " " + v)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
