// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!data.name || !data.email || !data.password) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const message = await response.text();

//       if (response.ok) {
//         setSuccess("🎉 Registration Successful! Please verify your email.");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         setError(message || "Something went wrong.");
//       }
//     } catch {
//       setError("Server error, try again later.");
//     }
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
//         <div className="text-center mb-4">
//           <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
//             style={{ width: "70px", height: "70px" }}>
//             <i className="bi bi-person-plus fs-2"></i>
//           </div>
//           <h2 className="fw-bold">Create Account</h2>
//           <p className="text-muted">Join us today and get started</p>
//         </div>

//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               placeholder="John Doe"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Email Address</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Password</label>
//             <div className="input-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
//               </button>
//             </div>
//           </div>

//           {/* Terms */}
//           <div className="form-check mb-3">
//             <input className="form-check-input" type="checkbox" id="terms" required />
//             <label className="form-check-label" htmlFor="terms">
//               I agree to the{" "}
//               <a href="#" className="text-success fw-semibold">Terms of Service</a> and{" "}
//               <a href="#" className="text-success fw-semibold">Privacy Policy</a>.
//             </label>
//           </div>

//           {/* Submit */}
//           <button type="submit" className="btn btn-success w-100">
//             Create Account
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <p className="mb-0">
//             Already have an account?{" "}
//             <Link to="/login" className="fw-semibold text-success">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const message = await response.text();

      if (response.ok) {
        setSuccess("🎉 Registration Successful! Please verify your email.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(message || "Something went wrong.");
      }
    } catch {
      setError("Server error, try again later.");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="container d-flex align-items-center justify-content-center min-vh-100" style={{ position: 'relative', zIndex: 1 }}>
        <div className="card shadow-lg p-4" style={{ 
          maxWidth: "500px", 
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "16px"
        }}>
          <div className="text-center mb-4">
            <div className="text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ 
                width: "70px", 
                height: "70px",
                background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                boxShadow: "0 8px 32px rgba(40, 167, 69, 0.3)"
              }}>
              <i className="bi bi-person-plus fs-2"></i>
            </div>
            <h2 className="fw-bold text-dark">Join Help Desk</h2>
            <p className="text-muted">Create your support account today</p>
          </div>

          {error && (
            <div className="alert alert-danger" style={{ background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.2)" }}>
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" style={{ background: "rgba(25, 135, 84, 0.1)", border: "1px solid rgba(25, 135, 84, 0.2)" }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
                style={{ 
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "2px solid rgba(40, 167, 69, 0.2)",
                  borderRadius: "8px"
                }}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={handleChange}
                style={{ 
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "2px solid rgba(40, 167, 69, 0.2)",
                  borderRadius: "8px"
                }}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  style={{ 
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid rgba(40, 167, 69, 0.2)",
                    borderRight: "none"
                  }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid rgba(40, 167, 69, 0.2)",
                    borderLeft: "none"
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="terms" required style={{ accentColor: "#28a745" }} />
              <label className="form-check-label text-dark" htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="fw-semibold" style={{ color: "#28a745", textDecoration: "none" }}>Terms of Service</a> and{" "}
                <a href="#" className="fw-semibold" style={{ color: "#28a745", textDecoration: "none" }}>Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn w-100 fw-semibold" style={{
              background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              border: "none",
              color: "white",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 4px 16px rgba(40, 167, 69, 0.3)"
            }}>
              Create Help Desk Account
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-0 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold" style={{ color: "#28a745", textDecoration: "none" }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;