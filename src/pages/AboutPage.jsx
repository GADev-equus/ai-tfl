/**
 * About Page for TFL Underground Assistant
 */

const AboutPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">🚇 TFL Underground Assistant</h1>
            <p className="lead text-muted">
              Your intelligent guide to London Underground services
            </p>
          </div>

          <div className="row mb-5">
            <div className="col-md-4 text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
              </div>
              <h4>Real-time Information</h4>
              <p className="text-muted">Get up-to-date line status, disruptions, and service updates</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </div>
              <h4>Station Information</h4>
              <p className="text-muted">Find platforms, facilities, and live arrival times</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-signpost-2" viewBox="0 0 16 16">
                  <path d="M7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.4 8.8a1 1 0 0 0 0 1.2l1.3 1.6a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l1.3-1.6a1 1 0 0 0 0-1.2L14.3 1.4a1 1 0 0 0-.8-.4H9v-.586a1 1 0 0 0-2 0M13.5 3l-1.5 2-1.5-2h3zM4 4v1H2V4h2zm0 3H2v1h2V7zm6 0v1h6V7H10z"/>
                </svg>
              </div>
              <h4>Journey Planning</h4>
              <p className="text-muted">Plan your route with step-by-step directions</p>
            </div>
          </div>

          <div className="card mb-5">
            <div className="card-body">
              <h3 className="card-title mb-4">Supported Underground Lines</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#FFD329', color: '#000' }}>●</span>
                      Circle Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#B36305', color: '#fff' }}>●</span>
                      Bakerloo Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#00782A', color: '#fff' }}>●</span>
                      District Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#E32017', color: '#fff' }}>●</span>
                      Central Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#000000', color: '#fff' }}>●</span>
                      Northern Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#003688', color: '#fff' }}>●</span>
                      Piccadilly Line
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#0098D4', color: '#fff' }}>●</span>
                      Victoria Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#A0A5A9', color: '#fff' }}>●</span>
                      Jubilee Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#9B0056', color: '#fff' }}>●</span>
                      Metropolitan Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#F3A9BB', color: '#000' }}>●</span>
                      Hammersmith & City Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#95CDBA', color: '#000' }}>●</span>
                      Waterloo & City Line
                    </li>
                    <li className="mb-2">
                      <span className="badge me-2" style={{ backgroundColor: '#6950A1', color: '#fff' }}>●</span>
                      Elizabeth Line
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">How to Use</h3>
              <div className="row">
                <div className="col-md-6">
                  <h5>Quick Queries</h5>
                  <ul>
                    <li>"Circle line status"</li>
                    <li>"Next trains at King's Cross"</li>
                    <li>"Is the Northern line running?"</li>
                    <li>"Disruptions on Central line"</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Journey Planning</h5>
                  <ul>
                    <li>"Camden to Oxford Circus"</li>
                    <li>"Best route to Heathrow"</li>
                    <li>"How to get to Tower Bridge"</li>
                    <li>"Journey from Paddington to Westminster"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a href="/chat" className="btn btn-primary btn-lg">
              Start Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;