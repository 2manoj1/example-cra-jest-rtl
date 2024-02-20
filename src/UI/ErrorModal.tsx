import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PopupDragControl from "./PopupDragControl";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

export const ErrorModalOverlay = (props: any) => {
	return (
		<div role="dialog">
			<div className={classes.backdrop} />
			<PopupDragControl>
				<header className={classes.header}>
					<h2>{props.title}</h2>
				</header>
				{props.message && (
					<div className={classes.content}>
						<p>{props.message}</p>
					</div>
				)}
				<footer className={classes.action}>
					<Button onClick={props.isConfirm}>確認</Button>
				</footer>
			</PopupDragControl>
		</div>
	);
};

const ErrorModal = (props: any) => {
	const modalRoot = useRef(document.createElement("div"));
	useEffect(() => {
		let root = document.getElementById("overlays");
		/**
		 * this is for require for unit testing and jest
		 */
		if (!root) {
			root = document.createElement("div");
			root.setAttribute("id", "overlays");
			document.body.appendChild(root);
		}

		root.appendChild(modalRoot.current);

		return () => {
			root?.removeChild(modalRoot.current);
		};
	}, []);
	const { title, message, onConfirm } = props;
	const messageText = typeof message === "string" && message ? message : null;
	return ReactDOM.createPortal(
		<ErrorModalOverlay
			title={title}
			message={messageText}
			isConfirm={onConfirm}></ErrorModalOverlay>,
		modalRoot.current
	);
};

export default ErrorModal;
