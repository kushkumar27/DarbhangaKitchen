import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header/Header.js";
import Carousel from "./Components/Carousel/Carousel.js";
import Footer from "./Components/Footer/Footer.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Components/Home/home.js";
import TopPicks from "./Components/TopPicks/Toppicks.js";
import BreakFast from "./Components/BreakFast/BreakFast.js";
import Dinner from "./Components/Dinner/Dinner.js";

import Lunch from "./Components/Lunch/Lunch.js";
import NorthIndian from "./Components/NorthIndian/NorthIndian.js";
import SouthIndian from "./Components/SouthIndian/SouthIndian.js";
import OrderSummary from "./Components/OrderSummary/OrderSummary.js";
import TrackOrder from "./Components/TrackOrder/TrackOrder.js";

import "./styles.css"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Header />
    
    <Carousel />

    <Router>
      <Route path="/home" exact component={Home} />

      <Route path="/toppicks" exact component={TopPicks} />
      <Route path="/breakfast" exact component={BreakFast} />
      <Route path="/dinner" exact component={Dinner} />

      <Route path="/lunch" exact component={Lunch} />
      <Route path="/northindian" exact component={NorthIndian} />
      <Route path="/southindian" exact component={SouthIndian} />
      <Route path="/ordersummary" exact component={OrderSummary} />
      <Route path="/trackorder" exact component={TrackOrder} />
    </Router>
    <Footer />
  </StrictMode>,
  rootElement
);
