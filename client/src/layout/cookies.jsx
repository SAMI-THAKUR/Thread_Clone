import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Icon } from "@iconify/react";

const CookieConsentPopup = () => {
  const [isCookieAllowed, setIsCookieAllowed] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setIsCookieAllowed(consent === "true");
      setIsConsentGiven(true);
    }
  }, []);

  const handleAllowCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsCookieAllowed(true);
    setIsConsentGiven(true);
    closePopup();
  };

  const handleDenyCookies = () => {
    alert("You have denied cookies, and the website will now exit.");
    window.location.href = "https://www.google.com"; // Redirect to an external page
  };

  const [open, setOpen] = useState(true);

  const closePopup = () => {
    setOpen(false);
  };

  if (isConsentGiven && isCookieAllowed) {
    return null; // User already gave consent, no need to show the popup
  }

  return (
    <>
      <Popup open={open} onClose={closePopup} modal closeOnDocumentClick={false}>
        <div style={styles.container} className="font-Konkhmer text-text">
          <Icon icon="fluent:cookies-16-filled" className="mx-auto text-7xl mb-5 text-amber-900" />
          <p className="mb-10">This website uses cookies to enhance your experience. Do you allow cookies ?</p>
          <button style={styles.allowButton} onClick={handleAllowCookies} className="rounded-lg">
            Allow
          </button>
          <button style={styles.denyButton} onClick={handleDenyCookies} className="rounded-lg">
            Deny
          </button>
        </div>
      </Popup>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
  },
  allowButton: {
    marginRight: "10px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  denyButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default CookieConsentPopup;
