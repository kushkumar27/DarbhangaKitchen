import NewOrder from "../order.js";
import Menu from "../Menu.js";
import { Con } from "../SearchMenu/SearchMenu.js";
import { useState, useContext } from "react";

var tag1;
export default function MenuItem(props) {
  const searchItem = props.search;
  const type = props.type;
  const [count, setCount] = useState(0);
  const [orders, setOrder] = useState(NewOrder.order);
  tag1 = props.tag;
  var arr = [];
  if (searchItem == "none") {
    arr = Menu.filter((dish) => {
      let tags = dish.tag;
      for (let i = 0; i < tags.length; i++) {
        if (tags[i] == tag1) {
          if (type != "none") {
            if (dish.type == type) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    });
  } else {
    arr = Menu.filter((dish) => {
      let str = dish.name.toLowerCase();
      let patt = new RegExp(searchItem.toLowerCase());
      let res = patt.test(str);
      return res;
    });
  }
  function addItem(event) {
    let id = event.target.value;
    NewOrder.order[id] += 1;
    setCount(count + 1);
    //console.log(orders);
  }
  function removeItem(event) {
    let id = event.target.value;
    if (NewOrder.order[id] === 0) return;
    NewOrder.order[id] -= 1;
    setCount(count + 1);
    console.log(NewOrder);
  }
  return (
    <div className="menu-toppicks">
      {arr.map((dish) => (
        <div class="card" style={{ width: "18rem" }}>
          <img src={dish.src} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{dish.name}</h5>
            <p class="card-text">{dish.desc}</p>
            <button
              value={dish.id}
              class="w3-button  w3-circle w3-teal"
              onClick={(event) => {
                removeItem(event);
              }}
            >
              -
            </button>
            <span> </span>
            <span style={{ "font-size": "2em" }}>{orders[dish.id]}</span>
            <span> </span>
            <button
              value={dish.id}
              class="w3-button  w3-circle w3-red w3-card-4"
              onClick={(event) => {
                addItem(event);
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
function navbar() {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
