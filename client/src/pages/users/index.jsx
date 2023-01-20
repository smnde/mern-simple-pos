import React from "react";
import CreateUser from "./create";
import ListUsers from "./list";

export default function Users() {
	return (
		<div className="container pt-3">
			<h3 className="">Manajemen User</h3>
			<hr />

			<div className="row">
				<CreateUser />
				<ListUsers />
			</div>
		</div>
	);
}
