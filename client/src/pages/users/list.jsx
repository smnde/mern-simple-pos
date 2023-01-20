import React from "react";
import { useGetUsersQuery } from "../../services/api/users.api";
import DeleteUser from "./delete";
import EditUser from "./edit";

export default function ListUsers() {
	const {
		data: { users } = [],
		isLoading,
		isError,
		error,
	} = useGetUsersQuery();

	return (
		<div className="col-md-8">
			<div className="card">
				<div className="card-header bg-info text-white">
					<h5 className="card-title">Daftar User</h5>
				</div>
				<div className="card-body">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Nama</th>
								<th scope="col">Username</th>
								<th scope="col">Role</th>
								<th scope="col">Aksi</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td>Loading...</td>
								</tr>
							)}

							{users &&
								users.map((user, index) => (
									<tr key={user._id}>
										<th scope="row">{index + 1}</th>
										<td>{user.name}</td>
										<td>{user.username}</td>
										<td>{user.role}</td>
										<td className="d-flex">
											<div className="me-1">
												<EditUser id={user._id} />
											</div>
											<div className="ms-1">
												<DeleteUser id={user._id} />
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
