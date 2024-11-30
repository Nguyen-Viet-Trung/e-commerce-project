import React from "react";

const AboutUsInformation = () => {
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h1
            className="display-4 font-weight-bold"
            style={{ fontWeight: 700 }}
          >
            <strong>About Us</strong>
          </h1>
        </div>
      </div>
      {/* Header Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1>Trung Tech</h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            At <strong>Trung Tech</strong>, we're redefining how you experience
            electronics shopping. Launched in 2024, Trung Tech is the brainchild
            of passionate individuals who believe that technology should be
            accessible, powerful, and innovative.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            Our mission? To bring the latest in{" "}
            <strong>smartphones, tablets, and laptops</strong> directly to your
            fingertips with ease and excitement.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://i.ibb.co/FJjNFyt/AboutUs1.jpg"
            className="img-fluid rounded shadow"
            alt="About Trung Tech"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2">
          <h2>Our Story</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            Born from a desire to deliver{" "}
            <strong>cutting-edge technology</strong> to Vietnam’s rapidly
            growing market, Trung Tech emerged as a fresh face in the e-commerce
            landscape. We began our journey with a single goal in mind:{" "}
            <strong>
              to offer high-quality tech products at competitive prices
            </strong>
            , all while delivering exceptional customer service.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            From the sleek designs of the latest <strong>smartphones</strong> to
            the powerful performance of our <strong>laptops and tablets</strong>
            , we hand-pick every item in our inventory to ensure you have access
            to only the best. Our product selection is thoughtfully curated for
            those who value innovation, quality, and style.
          </p>
        </div>
        <div className="col-md-6 order-md-1">
          <img
            src="https://i.ibb.co/mFTKKMc/OurStory.jpg"
            className="img-fluid rounded shadow"
            alt="Our Story Trung Tech"
          />
        </div>
      </div>

      {/* Why Trung Tech Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h2>Why Trung Tech?</h2>
          <br></br>
          <ul style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>A carefully curated selection</strong> of premium tech
              products
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Competitive pricing</strong> to bring value to your
              purchase
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Fast shipping and easy returns</strong> to make your
              shopping experience smooth
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Dedicated customer support</strong> to answer any
              questions or concerns
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <img
            src="https://i.ibb.co/D9tzSs4/WhyUs.jpg"
            className="img-fluid rounded shadow"
            alt="Why Trung Tech"
          />
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2">
          <h2>Our Promise</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            At Trung Tech, we are more than just a retailer – we are your
            partner in exploring the latest trends in electronics. Whether
            you’re a tech enthusiast or someone who simply wants reliable
            devices for everyday use, we’ve got something for everyone.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            We’re not just growing a brand; we’re building a community of tech
            lovers. Join us as we continue to evolve and shape the future of
            technology in Vietnam.
          </p>
        </div>
        <div className="col-md-6 order-md-1">
          <img
            src="https://i.ibb.co/gv4crht/Collection-Banner-690x545-BPP-Eng.jpg"
            style={{ height: "400px", width: "600px" }}
            className="img-fluid rounded shadow"
            alt="Our Promise Trung Tech"
          />
        </div>
      </div>

      {/* Stay Connected Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h2>Stay Connected</h2>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            We’re always updating our catalog with the newest arrivals and tech
            trends. Be sure to follow us on social media and subscribe to our
            newsletter to stay up-to-date with the latest from Trung Tech!
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://i.ibb.co/qD64jRd/stay-connected-quote.jpg"
            className="img-fluid rounded shadow"
            alt="Stay Connected Trung Tech"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsInformation;
