import React from "react";
import "./App.scss";
import Cloud from "./pages/pricing/components/CloudPricing";
import Server from "./pages/pricing/components/ServerPricing";

function App() {
  return (
    <div>

      <div className="navbar">
        <div className="navbar__wrapper flex">
          <div className="navbar__logo">
            <img src="ocotopusdeploy-logo.svg" alt="Octopus Deploy Logo" />
          </div>
          <nav className="navbar__menu">
            <ul className="navbar__menu-items">
              <li className="navbar__menu-li"><a href="#">Features</a></li>
              <li className="navbar__menu-li"><a href="#">Pricing</a></li>
              <li className="navbar__menu-li"><a href="#">What's New</a></li>
              <li className="navbar__menu-li"><a href="#">Recources</a></li>
              <li className="navbar__menu-li"><a href="#">Blog</a></li>
              <li className="navbar__menu-li"><a href="#">Enterprise</a></li>
              <li className="navbar__menu-li"><a href="#">Sign-in</a></li>
              <li className="navbar__menu-li"><button className="btn">Start a trial {'>'}</button></li>
            </ul>
          </nav>
        </div>
      </div>

      <h1>One product, two ways to host it</h1>
      <div>
        <Cloud />
        <Server />
      </div>

    </div>
  );
}

export default App;
