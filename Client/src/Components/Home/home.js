import "./styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NewsLetter } from "./newsletter";

let home_data = [
  {
    name: "Top picks",
    description: "Most picked food items by customers nationwide",
    link: "toppicks",
    src: "./kalash_pics/top_pic.jpg",
  },
  {
    name: "North Indian",
    description: "When spices start speaking,The incredible tastes of India",
    link: "northindian",
    src: "./kalash_pics/north.jpg",
  },
  {
    name: "South Indian",
    description: "From the south to your mouth,Succulent southern specialties",
    link: "southindian",
    src: "./kalash_pics/south.jpg",
  },
  {
    name: "Breakfast",
    description:
      "It is the mouthful that is the commitment to a new day, a continuing life.",
    link: "breakfast",
    src: "./kalash_pics/breakfast_pic.jpg",
  },
  {
    name: "Lunch",
    description: "Mouthwatering Lunch Set You Can’t Say No To",
    link: "lunch",
    src: "./kalash_pics/lunch_pic.jpg",
  },
  {
    name: "Dinner",
    description: "Expect the best,Deliciousness jumping into the mouth",
    link: "dinner",
    src: "./kalash_pics/dinner_pic.jpg",
  },
];
const item_arr = [];
for (let i = 1; i <= home_data.length; i++) {
  item_arr[i] = i;
}
export default function Home() {
  return (
    <div className="home container">
      <div id="home-title">We have got you served</div>
      <div className="home-items">
        {item_arr.map((i) => (
          <div>
            <Item data={i} />
          </div>
        ))}
      </div>
      <div class="home-message">
        <HomeMessage />
      </div>
      <div class="home-about-restra">
        <Location />
      </div>
      <div class="home-newsletter">
        <NewsLetter />
      </div>
    </div>
  );
}
function Item(props) {
  let d = home_data[props.data - 1];

  return (
    <div class="card" style={{ width: "18rem" }}>
      <img src={d.src} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{d.name}</h5>
        <p class="card-text">{d.description}</p>
        <Link to={d.link} class="btn btn-primary">
          Explore
        </Link>
      </div>
    </div>
  );
}

function HomeMessage() {
  return (
    <div id="home-message-id">
      <div id="message">
        "People who love to eat <br />
        are always the best people." "To eat is a necessity, but to eat
        intelligently is an art."
        <br />
        "We all eat, an it would be a sad waste <br />
        of opportunity to eat badly." <br />
        "If you really want to make a friend, go to someone's house and eat with
        him...the people who give you their food give you their heart."
      </div>
    </div>
  );
}

function Location() {
  return (
    <div>
      <div style={{ "font-style": "italic" }}>Visit our place.....</div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28654.684063397934!2d85.899782!3d26.136905799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1633958240643!5m2!1sen!2sin"
        width="400"
        height="250"
      ></iframe>
    </div>
  );
}
