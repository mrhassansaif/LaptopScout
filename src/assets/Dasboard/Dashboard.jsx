import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { CiLogout } from "react-icons/ci";
import { Button, Modal, Spinner, Container, Navbar } from "react-bootstrap";
import { Navigate } from 'react-router-dom';

import { auth, onAuthStateChanged, signOut } from "../Firebase/FirebaseConfig";
import DashboardContent from "./DashboardContent/DashboardContent";

export default function Dashboard() {
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsUser(true);
      } else {
        setUser(null);
        setIsUser(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      setIsUser(false);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const closeModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spinner animation="grow" />
        </div>
      ) : isUser ? (
        <>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand>User's Email: {user.email}</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Button variant="danger" onClick={handleLogout}>
                    <CiLogout /> Logout
                  </Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <DashboardContent />

          {/* Logout Confirmation Modal */}
          <Modal show={showLogoutModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout {user.email}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmLogout}>
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
}
