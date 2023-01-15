import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { clearCredential } from "../services/slice/auth.slice";
import { useLazyLogoutQuery } from "../services/api/auth.api";
import { NavLink } from "react-router-dom";

export default function Sidenav() {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);
	const [loggedOut] = useLazyLogoutQuery();

	const signout = async () => {
		await loggedOut();
		dispatch(clearCredential());
	};

	return (
		<Navbar bg="info" expand="lg" sticky="top">
			<Container>
				<NavLink to={"/"} className={"navbar-brand text-white"}>
					MERN POS
				</NavLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{auth.role === "admin" && (
						<Nav className="justify-content-start flex-grow-1 pe-3">
							<NavLink
								to={"/"}
								exact={"true"}
								className={"nav-link text-white"}
							>
								Dashboard
							</NavLink>
							<NavLink to={"/users"} className={"nav-link text-white"}>
								User
							</NavLink>
							<NavLink to={"/categories"} className={"nav-link text-white"}>
								Kategori
							</NavLink>
							<NavLink to={"/products"} className={"nav-link text-white"}>
								Produk
							</NavLink>
							<NavLink to={"/orders"} className={"nav-link text-white"}>
								Pembelian
							</NavLink>
							<NavLink to={"/orders-report"} className={"nav-link text-white"}>
								Laporan Pembelian
							</NavLink>
							<NavLink to={"/sales-report"} className={"nav-link text-white"}>
								Laporan Penjualan
							</NavLink>
							<NavLink
								to={"/return-sales-report"}
								className={"nav-link text-white"}
							>
								Laporan Retur
							</NavLink>
						</Nav>
					)}

					{auth.role === "kasir" && (
						<Nav className="justify-content-start flex-grow-1 pe-3">
							<NavLink
								to={"/"}
								exact={"true"}
								className={"nav-link text-white"}
							>
								Dashboard
							</NavLink>

							<NavLink to={"/products"} className={"nav-link text-white"}>
								Produk
							</NavLink>

							<NavLink to={"/sales"} className={"nav-link text-white"}>
								Penjualan
							</NavLink>

							<NavLink to={"/expenses"} className={"nav-link text-white"}>
								Pengeluaran
							</NavLink>
						</Nav>
					)}

					<Nav className="justify-content-end flex-grow-1 pe-3">
						<NavDropdown title={auth.user} id="basic-nav-dropdown">
							<NavDropdown.Item>
								<div onClick={signout}>Logout</div>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
