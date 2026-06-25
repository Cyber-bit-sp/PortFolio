import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          <span>Education</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of engineering, Software Engineering</h4>
                <h5>Concordia University</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
               Advanced studies in software engineering, intelligent systems, and modern application development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
