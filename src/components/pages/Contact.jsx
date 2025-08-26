import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../AnimatedBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <>
      <AnimatedBackground />
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
              <div className="me-3" style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>HD</span>
              </div>
              <span className="fw-bold fs-4" style={{ color: '#2d3748' }}>
                HelpDesk Ticketing System
              </span>
            </Link>

            <div className="navbar-nav ms-auto">
              <Link to="/" className="btn btn-outline-secondary me-2" style={{ borderRadius: '8px' }}>
                Home
              </Link>
              <Link to="/login" className="btn btn-outline-primary me-2" style={{ borderRadius: '8px' }}>
                Login
              </Link>
              <Link to="/feedback" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}>
                Feedback
              </Link>
            </div>
          </div>
        </nav>

        {/* Contact Section */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-lg border-0 rounded-4" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <div className="mb-3" style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                      }}>
                        <i className="bi bi-envelope-fill text-white fs-2"></i>
                      </div>
                      <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
                        Contact Us
                      </h2>
                      <p className="text-muted">
                        Have questions or need support? We'd love to hear from you.
                      </p>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="alert alert-success mb-4" style={{
                        background: 'rgba(25, 135, 84, 0.1)',
                        border: '1px solid rgba(25, 135, 84, 0.2)',
                        borderRadius: '12px'
                      }}>
                        <i className="bi bi-check-circle me-2"></i>
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '2px solid rgba(102, 126, 234, 0.2)',
                              borderRadius: '8px'
                            }}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '2px solid rgba(102, 126, 234, 0.2)',
                              borderRadius: '8px'
                            }}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-control"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '2px solid rgba(102, 126, 234, 0.2)',
                            borderRadius: '8px'
                          }}
                          placeholder="What's this about?"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control"
                          rows="5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '2px solid rgba(102, 126, 234, 0.2)',
                            borderRadius: '8px'
                          }}
                          placeholder="Tell us more about your inquiry..."
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100 fw-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          color: 'white',
                          borderRadius: '8px',
                          padding: '12px',
                          boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm text-center" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body p-4">
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
                      <i className="bi bi-linkedin text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">LinkedIn</h5>
                    <p className="text-muted">linkedin.com/in/ajay-anbarasu</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm text-center" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body p-4">
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
                      <i className="bi bi-envelope text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">Email</h5>
                    <p className="text-muted">ajaykalimuthu05@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card h-100 border-0 shadow-sm text-center" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body p-4">
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
                      <i className="bi bi-github text-white fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-3">GitHub</h5>
                    <p className="text-muted">github.com/Ajay-56</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
