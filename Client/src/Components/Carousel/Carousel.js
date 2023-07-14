import "./styles.css";

export default function Carousel() {
  const src1 = "";
  const src2 =
    "https://content.jdmagicbox.com/comp/darbhanga/a5/9999p6272.6272.140121072043.j4a5/catalogue/baba-steel-house-darbhanga-1tolt93nyu.jpg?clr=";
  const src3 =
    "https://b.zmtcdn.com/data/reviews_photos/684/2314eaeca0a6651328d670a3336e2684_1614002873.jpg";
  return (
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="./kalash_pics/rest.jpg" class="d-block w-100" alt="first" />
        </div>
        <div class="carousel-item">
          <img
            src="./kalash_pics/restaurant_pic1.jpg"
            class="d-block w-100"
            alt="second"
          />
        </div>
        <div class="carousel-item">
          <img
            src="./kalash_pics/restaurant_pic2.jpg"
            class="d-block w-100"
            alt="third"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
