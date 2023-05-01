import logo from '../../assets/tree-logo-white.svg'
import {Container, Nav, Navbar} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {deleteAuth} from "../../auth";

export default function MainNavbar() {

    const handleLogout = () => {
        deleteAuth()
        window.location.reload()
    }

    return (
        <Navbar bg="dark" variant="dark" sticky={"top"}>
            <Container>
                <Navbar.Brand>
                    <img src={logo} className="App-logo w-10 rounded-full" alt="logo" />
                    Ród Warchołów
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Drzewo</Nav.Link>
                    <Nav.Link href="/about">O projekcie</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="secondary" onClick={handleLogout}>Wyloguj</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}