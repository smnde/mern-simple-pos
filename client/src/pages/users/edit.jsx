import React, { useEffect } from "react";
import Modals from "../../components/Modal";
import { useForm } from "react-hook-form";
import {
	useLazyShowUserQuery,
	useUpdateUserMutation,
} from "../../services/api/users.api";
import { toast } from "react-hot-toast";

export default function EditUser({ id }) {
	const [updateUser] = useUpdateUserMutation();
	const { register, handleSubmit, reset } = useForm();
	const [showUser, { data }] = useLazyShowUserQuery();

	const update = async (payload) => {
		await updateUser(payload, id)
			.unwrap()
			.then(() => {
				reset();
				toast.success("Data berhasil diubah");
			})
			.catch(() => {
				toast.error("Data gagal diubah");
			});
	};

	useEffect(() => {
		showUser(id);
	}, [id, showUser]);

	return (
		<Modals
			title={"Edit user"}
			btnVariant={"success"}
			btnTitle={"Edit"}
			btnSize={"sm"}
		>
			{/* <form onSubmit={handleSubmit(update)}>
				<input
					type="hidden"
					{...register("id", { required: true })}
					defaultValue={user && user._id}
				/>

				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Nama
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						{...register("name", { required: true })}
						defaultValue={user && user.name}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						type="text"
						className="form-control"
						id="username"
						{...register("username", { required: true })}
						defaultValue={user && user.username}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="role" className="form-label">
						Role
					</label>
					<select
						className="form-select"
						id="role"
						name="role"
						{...register("role", { required: true })}
						defaultValue={user && user.role}
					>
						<option value="">Pilih</option>
						<option value="admin">Admin</option>
						<option value="kasir">Kasir</option>
					</select>
				</div>

				<button type="submit" className="btn btn-primary float-end">
					Simpan
				</button>
			</form> */}
		</Modals>
	);
}
