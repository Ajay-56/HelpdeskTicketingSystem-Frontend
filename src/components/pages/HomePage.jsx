import React from 'react';
import { Link } from 'react-router-dom';
import NewAnimatedBackground from './NewAnimatedBackground';

const HomePage = () => {
  return (
    <>
      <NewAnimatedBackground />
      <div className="min-vh-100" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <nav className="navbar navbar-expand-lg" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <div className="me-3">
                <img 
                  src="/Logo.png"  // ✅ change if logo file is logo.svg / logo.ico
                  alt="HelpDesk Logo"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                    objectFit: "cover"
                  }}
                />
              </div>
              <span className="fw-bold fs-4" style={{ color: '#2d3748' }}>
                HelpDesk Ticketing System
              </span>
            </Link>
            
            <div className="navbar-nav ms-auto">
              <Link 
                to="/login" 
                className="btn btn-outline-primary me-2"
                style={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
              >
                Login
              </Link>
              <Link 
                to="/contact" 
                className="btn btn-outline-secondary me-2"
                style={{
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
              >
                Contact
              </Link>
              <Link 
                to="/feedback" 
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '500',
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                }}
              >
                Feedback
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-5" style={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="container text-center py-5">
            <h1 className="display-4 fw-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome to HelpDesk Ticketing System
            </h1>
            <p className="lead mb-4" style={{ color: '#4a5568', maxWidth: '800px', margin: '0 auto' }}>
              Streamline your customer support with our comprehensive ticketing system. Create, track, and resolve support tickets efficiently with role-based access for admins, agents, and employees. Transform your customer service experience and boost satisfaction rates.
            </p>
            <Link 
              to="/login" 
              className="btn btn-lg"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white',
                borderRadius: '12px',
                padding: '12px 30px',
                fontWeight: '600',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}
            >
              Get Started Today
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5" style={{ 
          background: 'rgba(248, 250, 252, 0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="container">
            <h2 className="text-center mb-5 fw-bold" style={{ color: '#2d3748' }}>
              Why Use Our Help Desk Ticketing System?
            </h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="bi bi-clipboard-check text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d3748' }}>
                      Simplifies Support Requests
                    </h5>
                    <p className="text-muted">
                      Easy ticket creation and management system that streamlines the entire support process from start to finish.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="bi bi-person-gear text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d3748' }}>
                      Smart Agent Assignment
                    </h5>
                    <p className="text-muted">
                      Automatically assigns tickets to the right agents based on expertise, workload, and availability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="bi bi-speedometer2 text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d3748' }}>
                      Real-time Tracking
                    </h5>
                    <p className="text-muted">
                      Monitor ticket progress with real-time status updates and comprehensive tracking capabilities.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <i className="bi bi-heart-fill text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3" style={{ color: '#2d3748' }}>
                      Enhanced Satisfaction
                    </h5>
                    <p className="text-muted">
                      Improve customer satisfaction with faster resolutions and transparent communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-5" style={{
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
          color: 'white'
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h3 className="fw-bold mb-3">Make Happy Customers</h3>
                <p className="mb-4" style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
                  Our system helps businesses scale and streamline customer support, ensuring faster resolutions and happier users. Join thousands of companies already using our platform to deliver exceptional customer service.
                </p>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex justify-content-md-end justify-content-center gap-3">
                  <a 
                    href="https://github.com/Ajay-56" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-light rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ajay-anbarasu-595584290/?originalSubdomain=in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-light rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="bi bi-linkedin fs-4"></i>
                  </a>
                  <a 
                    href="mailto:ajaykalimuthu05@gmail.com"
                    className="btn btn-outline-light rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </a>
                  <a 
                    href="https://www.instagram.com/a_j_a_y___a_n_b_a_r_a_s_u/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-light rounded-circle"
                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <i className="bi bi-instagram fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
            <hr className="my-4" style={{ borderColor: '#4a5568' }} />
            <div className="row">
              <div className="col-md-6">
                <p className="mb-0" style={{ color: '#a0aec0' }}>
                  © 2025 HelpDesk Ticketing System. All rights reserved.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="mb-0" style={{ color: '#a0aec0' }}>
                  Built with ❤️ by Ajay Anbarasu
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
