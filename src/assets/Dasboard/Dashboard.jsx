// Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { CiLogout } from "react-icons/ci";
import { Button, Modal, Spinner, Container, Navbar } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { auth, onAuthStateChanged, signOut } from "../Firebase/FirebaseConfig";
import DashboardContent from "./DashboardContent/DashboardContent";

export default function Dashboard() {
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);

  // Prank modal states
  const [showPrank1, setShowPrank1] = useState(false);
  const [showPrank2, setShowPrank2] = useState(false);
  const [showPrank3, setShowPrank3] = useState(false);

  // Text used in modals (safe, non-offensive)
  const PRANK_TEXT1 = "Idhar kidhar bhai?"; // First modal
  const PRANK_TEXT2 = "Why are you GAY?"; // Shown beneath image in second modal
  const PRANK_TEXT3 = "Chalo app man gaye app Gay ho. You Gayest Gay MF!!!"; // Final modal text

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setIsUser(true);
      } else {
        setUser(null);
        setIsUser(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Trigger prank flow for target email only
  useEffect(() => {
    if (!isLoading && user && user.email) {
      if (user.email.toLowerCase() === "bilal@gaylord.com") {
        // small delay so UI settles before modal appears
        setTimeout(() => setShowPrank1(true), 300);
      } else {
        setShowPrank1(false);
        setShowPrank2(false);
        setShowPrank3(false);
      }
    }
  }, [isLoading, user]);

  const handleLogout = () => setShowLogoutModal(true);

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      setIsUser(false);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const closeLogoutModal = () => setShowLogoutModal(false);

  // Prank flow handlers:
  // Attempt to close first modal -> open second
  const handlePrank1CloseAttempt = () => {
    setShowPrank1(false);
    // small delay for smoothness
    setTimeout(() => setShowPrank2(true), 200);
  };

  // Closing second modal (or pressing its Continue) -> open third
  const handlePrank2CloseAttempt = () => {
    setShowPrank2(false);
    setTimeout(() => setShowPrank3(true), 200);
  };

  // Final close that actually dismisses everything
  const handlePrank3Close = () => {
    setShowPrank3(false);
    setShowPrank2(false);
    setShowPrank1(false);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
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

          {/* Prank Modal 1 - large and covering a big portion */}
          <Modal
            show={showPrank1}
            onHide={handlePrank1CloseAttempt}
            backdrop="static"
            keyboard={false}
            dialogClassName="prank-modal-large"
            centered
          >
            <Modal.Header>
              <Modal.Title>BILAL THE GAYEST GAY</Modal.Title>
              {/* Custom close that advances the prank */}
              
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh", fontSize: "1.4rem" }}>
              {PRANK_TEXT1}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handlePrank1CloseAttempt}>
                Close Modal
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Prank Modal 2 - image above text */}
          <Modal
            show={showPrank2}
            onHide={handlePrank2CloseAttempt}
            backdrop="static"
            keyboard={false}
            dialogClassName="prank-modal-large"
            centered
          >
            <Modal.Header>
              <Modal.Title>Aik bat toh batata ja jani</Modal.Title>
             
            </Modal.Header>
            <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
              {/* Use uploaded image path as requested */}
              <img
                src="/src/assets/Images/funnyafrican.jpg"
                alt="prank"
                className="prank-image"
              />
              <div style={{ marginTop: 12, fontSize: "1.4rem", textAlign: "center" }}>{PRANK_TEXT2}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handlePrank2CloseAttempt}>
                Confirm: I am Gay
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Prank Modal 3 - final message with closing button */}
          <Modal
            show={showPrank3}
            onHide={() => {}}
            backdrop="static"
            keyboard={false}
            dialogClassName="prank-modal-large"
            centered
          >
            <Modal.Header>
              <Modal.Title>HA HA HA, Yokoso, Watashi no Soul Society!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "30vh", fontSize: "1.25rem", textAlign: "center" }}>
              {PRANK_TEXT3}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrank3Close}>
                Ja Ja Kr le Check Laptop
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Logout Confirmation Modal */}
          <Modal show={showLogoutModal} onHide={closeLogoutModal}>
            <Modal.Header closeButton>
              <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout {user?.email}?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeLogoutModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmLogout}>
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
