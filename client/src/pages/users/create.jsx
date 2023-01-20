import React from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../services/api/users.api";
import { toast } from "react-hot-toast";

export default function CreateUser() {
	const [createUser] = useCreateUserMutation();
	const { register, handleSubmit, reset } = useForm();
	const store = async (payload) => {
		await createUser(payload)
			.unwrap()
			.then(() => {
				toast.success("Data berhasil ditambahkan");
				reset();
			});
	};

	return (
		<div className="col-md-4">
			<div className="card">
				<div className="card-header bg-info text-white">
					<h5 className="card-title">Tambah User</h5>
				</div>
				<div className="card-body">
					<form onSubmit={handleSubmit(store)}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Nama
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="Masukkan nama"
								{...register("name", { required: true })}
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
								placeholder="Masukkan username"
								{...register("username", { required: true })}
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
							>
								<option value="">Pilih</option>
								<option value="admin">Admin</option>
								<option value="kasir">Kasir</option>
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="Masukkan password"
								{...register("password", { required: true })}
							/>
						</div>

						<button type="submit" className="btn btn-primary form-control">
							Simpan
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
