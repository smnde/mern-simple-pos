import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/api/auth.api";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../services/slice/auth.slice";

export default function Login() {
	const dispatch = useDispatch();
	const redirect = useNavigate();
	const { register, handleSubmit } = useForm();
	const [login] = useLoginMutation();

	const signIn = async (data) => {
		const user = await login(data).unwrap();
		dispatch(setCredentials(user));
		redirect("/");
	};

	return (
		<div className="container">
			<div className="row d-flex justify-content-center align-items-center vh-100 ">
				<div className="col-md-4 col-sm-4">
					<div className="card">
						<div className="card-header bg-info text-white">
							<h4 className="text-center">Login</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit(signIn)}>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">
										Username
									</label>
									<input
										type="text"
										name="username"
										className={`form-control`}
										placeholder="Username"
										{...register("username", { required: true })}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										name="password"
										className={`form-control`}
										placeholder="Password"
										{...register("password", { required: true })}
									/>
								</div>
								<button
									type="submit"
									className="btn btn-info form-control text-white"
								>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
