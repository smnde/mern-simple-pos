import React from "react";

export default function Login() {
	return (
		<div className="container">
			<div className="row d-flex justify-content-center align-items-center vh-100 ">
				<div className="col-md-4 col-sm-4">
					<div className="card">
						<div className="card-header bg-info text-white">
							<h4 className="text-center">Login</h4>
						</div>
						<div className="card-body">
							<form>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">
										Username
									</label>
									<input
										type="text"
										name="username"
										className={`form-control`}
										placeholder="Username"
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
