export const EmbeddedVideo = () => {
    return (
      <div className="py-3 py-md-5 bg-light">
        <div className="container">
          <h4 className="mb-0">Our Introduction</h4>
          <div className="d-flex justify-content-between align-items-center mb-4">
          </div>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/YebViC4mris?si=5YROlyclPbIVjjY7"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
  