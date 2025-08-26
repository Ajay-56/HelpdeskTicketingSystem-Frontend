import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../AnimatedBackground';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    rating: '',
    category: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
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
      setFeedbackData({ name: '', email: '', rating: '', category: '', feedback: '' });
    }, 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`btn p-0 me-1 ${i <= rating ? 'text-warning' : 'text-muted'}`}
          onClick={() => setFeedbackData({...feedbackData, rating: i.toString()})}
          style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}
        >
          {i <= rating ? '★' : '☆'}
        </button>
      );
    }
    return stars;
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
              <Link to="/contact" className="btn btn-outline-secondary" style={{ borderRadius: '8px' }}>
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Feedback Section */}
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
                        <i className="bi bi-chat-heart-fill text-white fs-2"></i>
                      </div>
                      <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
                        Share Your Feedback
                      </h2>
                      <p className="text-muted">
                        Your feedback helps us improve our HelpDesk system. Let us know what you think!
                      </p>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="alert alert-success mb-4" style={{
                        background: 'rgba(25, 135, 84, 0.1)',
                        border: '1px solid rgba(25, 135, 84, 0.2)',
                        borderRadius: '12px'
                      }}>
                        <i className="bi bi-check-circle me-2"></i>
                        Thank you for your feedback! We appreciate your input.
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                            Name (Optional)
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={feedbackData.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '2px solid rgba(102, 126, 234, 0.2)',
                              borderRadius: '8px'
                            }}
                            placeholder="Your name"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={feedbackData.email}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: '2px solid rgba(102, 126, 234, 0.2)',
                              borderRadius: '8px'
                            }}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Rating Section */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                          Overall Rating
                        </label>
                        <div className="d-flex align-items-center">
                          {renderStars(parseInt(feedbackData.rating) || 0)}
                          <span className="ms-3 text-muted">
                            {feedbackData.rating ? `${feedbackData.rating}/5 stars` : 'Click to rate'}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                          Feedback Category
                        </label>
                        <select
                          name="category"
                          value={feedbackData.category}
                          onChange={handleChange}
                          className="form-select"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '2px solid rgba(102, 126, 234, 0.2)',
                            borderRadius: '8px'
                          }}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="general">General Feedback</option>
                          <option value="bug">Bug Report</option>
                          <option value="feature">Feature Request</option>
                          <option value="ui-ux">UI/UX Experience</option>
                          <option value="performance">Performance</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label fw-semibold" style={{ color: '#2d3748' }}>
                          Your Feedback
                        </label>
                        <textarea
                          name="feedback"
                          value={feedbackData.feedback}
                          onChange={handleChange}
                          className="form-control"
                          rows="6"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '2px solid rgba(102, 126, 234, 0.2)',
                            borderRadius: '8px'
                          }}
                          placeholder="Tell us about your experience with our HelpDesk system..."
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
                            Submitting Feedback...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-heart-fill me-2"></i>
                            Submit Feedback
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Statistics */}
            <div className="row mt-5">
              <div className="col-md-3 mb-4">
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
                      <i className="bi bi-people-fill text-white fs-3"></i>
                    </div>
                    <h3 className="fw-bold text-success">1,250+</h3>
                    <p className="text-muted mb-0">Happy Users</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-4">
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
                      <i className="bi bi-star-fill text-white fs-3"></i>
                    </div>
                    <h3 className="fw-bold text-primary">4.8/5</h3>
                    <p className="text-muted mb-0">Average Rating</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-4">
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
                      <i className="bi bi-chat-dots-fill text-white fs-3"></i>
                    </div>
                    <h3 className="fw-bold text-warning">850+</h3>
                    <p className="text-muted mb-0">Feedback Received</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-4">
                <div className="card h-100 border-0 shadow-sm text-center" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px'
                }}>
                  <div className="card-body p-4">
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
                      <i className="bi bi-lightning-fill text-white fs-3"></i>
                    </div>
                    <h3 className="fw-bold text-danger">95%</h3>
                    <p className="text-muted mb-0">Response Rate</p>
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

export default Feedback;