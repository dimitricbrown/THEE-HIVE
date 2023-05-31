/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>THEE HIVE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>THE BUZZ</Nav.Link>
            </Link>
            <Link passHref href="/albums">
              <Nav.Link>MUSIC</Nav.Link>
            </Link>
            <Link passHref href="/photos">
              <Nav.Link>PHOTOS</Nav.Link>
            </Link>
            <Link passHref href="/videos">
              <Nav.Link>VIDEOS</Nav.Link>
            </Link>
            <Link passHref href="/awards">
              <Nav.Link>AWARDS</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>PROFILE</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>BUZZ OUT</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
