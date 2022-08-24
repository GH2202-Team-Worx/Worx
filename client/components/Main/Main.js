import React from "react";
import FeaturedProd from "./FeaturedProd";
import "../styles/main.css";
import familyPhoto from "../../../public/photos/cropped_family_photo.png";
import Reviews from "./Reviews";

const Main = () => {
  return (
    <React.Fragment>
      <div className="mainContainer">
        <FeaturedProd className="featured" />
        <div className="about-us">
          {/* <div className="family-photo"></div> */}
          <img className="family-photo" src={familyPhoto} alt="family-photo" />
          <div className="bio">
            <h3 className="bio-header">Our Story</h3>
            <div className="about-paragraph">
              <p>
                Bell’s Custom Worx specializes in high-end home décor and
                furnishings. All of our products are handcrafted locally in
                South Carolina. BCW was founded from a desire to create
                beautiful, functional art. Many of our items come from nature's
                throw aways, and our goal is repurpose them into beautiful
                products for all to enjoy. Some of the materials we use have
                been salvaged from historic sites here in South Carolina and
                surrounding states. Each piece has its own unique story of where
                it came from, how it started and where it is today, making each
                piece as unique as the one who buys it.
              </p>
              <p>
                The Bell family is a family of artists working together to give
                you one-of-a-kind products every time. David, the master
                machinist, was the one who really started it all. A piqued
                interest in similar artistry quickly blossomed into this
                family-wide passion. We wanted to create products that are
                distinctive and capture the attention of any who glance their
                way. With your much-appreciated support we can continue to live
                the American dream.
              </p>
            </div>
          </div>
        </div>
          <Reviews />
      </div>
    </React.Fragment>
  );
};

export default Main;
