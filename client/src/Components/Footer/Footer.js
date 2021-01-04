import React from 'react';
import { FaFacebookF,FaTwitter,FaLinkedinIn,FaGithubAlt } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
    return (
<div>
  <footer className="footer-distributed">
    <div className="footer-left">
      <h3>e-<span>LAWYER</span></h3>
      <p className="footer-links">
        <a href="/" className="link-1">Home</a>
        <a href="/">Posts</a>
        <a href="/">Register</a>
        <a href="/">Login</a>
        <a href="/">Contact</a>
      </p>
      <p className="footer-company-name">e-lawyer © 2020</p>
    </div>
    <div className="footer-center">
      <div>
        <i className="fa fa-map-marker" />
        <p><span>2280.Petite Ariana </span> Ariana, Tunisie</p>
      </div>
      <div>
        <i className="fa fa-phone" />
        <p>+216.98.434.969</p>
      </div>
      <div>
        <i className="fa fa-envelope" />
        <p><a href="mailto:elawyer.tn@gmail.com">elawyer.tn@gmail.com</a></p>
      </div>
    </div>
    <div className="footer-right">
      <p className="footer-company-about">
        <span>About e-lawyer website</span>
        e-lawyer est un cabinet d'avocats en ligne peut vous permettre de poser des questions, de demander la préparation de documents, de procès-verbaux et d'obtenir des éclaircissements sur les services que le cabinet concerné  à offrir.      </p>
      <div className="footer-icons">
        <a href="/"><FaFacebookF/></a>
        <a href="/"><FaTwitter/></a>
        <a href="/"><FaLinkedinIn/></a>
        <a href="/"><FaGithubAlt/></a>
      </div>
    </div>
  </footer>
</div>
    )
}
export default Footer;
