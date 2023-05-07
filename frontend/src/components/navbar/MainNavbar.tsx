import logo from '../../assets/tree-logo-white.svg'
import {Container, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {deleteAuth, getAuthUsername} from "../../auth";

export default function MainNavbar() {

    const handleLogout = () => {
        deleteAuth()
        window.location.reload()
    }

    return (
        <Navbar bg="dark" variant="dark" sticky={"top"} expand="lg">
                <Navbar.Brand>
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo" />{' '}
                    Ród Warchołów
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Drzewo</Nav.Link>
                    <Nav.Link href="/about">O projekcie</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link disabled className="text-light bg-dark">Zalogowany jako: {getAuthUsername()}</Nav.Link>
                        <Nav.Link onClick={handleLogout} className="btn btn-outline-light">Wyloguj</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}