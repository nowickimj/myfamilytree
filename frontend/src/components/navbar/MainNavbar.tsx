import logo from '../../assets/tree-logo-white.svg'
import {Container, Nav, Navbar} from "react-bootstrap";

export default function MainNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
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
                    <Navbar.Text>
                        Zalogowany jako: <a>admin</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}