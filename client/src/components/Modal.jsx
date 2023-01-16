import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Modals({
	children,
	title,
	btnVariant,
	btnTitle,
	btnSize,
}) {
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(!show);

	return (
		<>
			<Button size={btnSize} variant={btnVariant} onClick={handleShow}>
				{btnTitle}
			</Button>

			<Modal show={show} onHide={handleShow} backdrop="static" keyboard={true}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{children}
					<button
						onClick={handleShow}
						type="button"
						className="btn btn-secondary float-start mt-3"
					>
						Batal
					</button>
				</Modal.Body>
			</Modal>
		</>
	);
}
