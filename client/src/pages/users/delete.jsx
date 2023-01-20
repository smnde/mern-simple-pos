import React from "react";
import Modals from "../../components/Modal";
import { useDeleteUserMutation } from "../../services/api/users.api";
import { toast } from "react-hot-toast";

export default function DeleteUser({ id }) {
	const [deleteUser] = useDeleteUserMutation();
	const destroy = async () => {
		await deleteUser(id)
			.unwrap()
			.then(() => toast.success("Data berhasil dihapus"));
	};

	return (
		<Modals
			title={"Hapus user"}
			btnVariant={"danger"}
			btnTitle={"Hapus"}
			btnSize={"sm"}
		>
			<h5 className="text-center">Hapus data?</h5>
			<p className="text-center">
				Data yang dihapus tidak bisa dikembalikan lagi, lanjutkan?
			</p>

			<button onClick={destroy} className="btn btn-danger float-end mt-3">
				Ya
			</button>
		</Modals>
	);
}
