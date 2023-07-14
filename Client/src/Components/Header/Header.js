import { Link } from "react-router-dom";

import "./styles.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <img
          src="https://cdn.octopix.in/uploads/company-logo/2020/12/22/bhukkad-adda-wJFMg3UtbA488gX4Y2hAtxVrJjAnD1tKIRvVV3iJe57xhFE0ARSmwaJhktVWaBitCTW7pVP3NVPWfw1p-350x350.jpg"
          alt="logo"
        />
      </div>
      <div className="header-title">
        <a href="/home">darbhanga Kitchen</a>
        <div> - Paradise on your plate</div>
      </div>

      <div className="header-trackOrder">
        <a href="/trackorder" className="btn btn-primary">
          Track your order
        </a>
      </div>
    </div>
  );
}
