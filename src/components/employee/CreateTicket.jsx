import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { getAuthHeaders } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Technical Issue',
    'Software Bug',
    'Hardware Problem',
    'Account Access',
    'Feature Request',
    'General Inquiry'
  ];

  const priorities = ['Low', 'Medium', 'High'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Please enter a ticket title');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please enter a ticket description');
      return;
    }
    if (!formData.category) {
      setError('Please select a category');
      return;
    }
    if (!formData.priority) {
      setError('Please select a priority');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('https://helpdeskticketingsystem.onrender.com/api/employee/tickets/create', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(`🎉 Ticket created successfully! Ticket ID: #${result.ticketId}`);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: ''
        });

        // Redirect to tickets page after 2 seconds
        setTimeout(() => {
          navigate('/employee/tickets');
        }, 2000);
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to create ticket');
      }
    } catch (err) {
      console.error('Create ticket error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">Create New Ticket</h2>
        <p className="text-muted mb-0">Submit a new support request</p>
      </div>

      <div className="row">
        <div className="col-lg-8 col-xl-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success mb-4">
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Ticket Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief description of your issue"
                    maxLength="200"
                    disabled={loading}
                  />
                  <div className="form-text">
                    {formData.title.length}/200 characters
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label fw-semibold">
                    Category *
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label fw-semibold">
                    Priority *
                  </label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select priority level</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    <small>
                      <strong>Low:</strong> General questions, minor issues<br />
                      <strong>Medium:</strong> Issues affecting work but not critical<br />
                      <strong>High:</strong> Critical issues blocking work
                    </small>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Please provide detailed information about your issue, including steps to reproduce, error messages, and any other relevant details..."
                    maxLength="2000"
                    disabled={loading}
                  ></textarea>
                  <div className="form-text">
                    {formData.description.length}/2000 characters
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Ticket
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/employee/tickets')}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Help Sidebar */}
        <div className="col-lg-4 col-xl-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light border-bottom">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Tips for Creating Tickets
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-primary mb-2">📝 Writing a Good Title</h6>
                <ul className="small text-muted mb-0">
                  <li>Be specific and concise</li>
                  <li>Include the main issue or request</li>
                  <li>Avoid generic titles like "Help me"</li>
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-primary mb-2">📋 Providing Details</h6>
                <ul className="small text-muted mb-0">
                  <li>Describe what you were trying to do</li>
                  <li>Include any error messages</li>
                  <li>Mention what you've already tried</li>
                  <li>Add screenshots if helpful</li>
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-primary mb-2">⚡ Priority Guidelines</h6>
                <ul className="small text-muted mb-0">
                  <li><strong>High:</strong> System down, can't work</li>
                  <li><strong>Medium:</strong> Feature not working properly</li>
                  <li><strong>Low:</strong> Questions, minor issues</li>
                </ul>
              </div>

              <div className="border-top pt-3 mt-3">
                <h6 className="text-success mb-2">
                  <i className="bi bi-clock me-2"></i>
                  Response Times
                </h6>
                <ul className="small text-muted mb-0">
                  <li>High Priority: 2-4 hours</li>
                  <li>Medium Priority: 1-2 business days</li>
                  <li>Low Priority: 2-3 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;