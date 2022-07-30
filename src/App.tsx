import React from "react";
import "./App.scss";
import Cloud from "./pages/pricing/components/CloudPricing";
import Server from "./pages/pricing/components/ServerPricing";

function App() {
  return (
    <div>

      <section className="navbar">
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
              <li>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
              <li className="navbar__menu-li"><a href="#">Sign-in</a></li>
              <li className="navbar__menu-li"><button className="btn">Start a trial {'>'}</button></li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="hero">
          <div className="hero__titles">
            <h1>One product, two ways to host it</h1>
            <h3>Adapt without overcommitting budgets by only paying for what you use</h3>
          </div>
          <div className="pricing__wrapper">
            <div className="pricing__tiers">
              <div className="pricing__tiers--tier pricing__tiers--tier1">
                <Cloud />
              </div>
              <div className="pricing__tiers--tier pricing__tiers--tier2">
                <Server />
              </div>
            </div>
          </div>
          <div className="pricing--bg-color">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
      </section>

    </div>
  );
}

export default App;
