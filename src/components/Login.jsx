// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// // Helper to decode JWT
// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch (e) {
//     console.error("Failed to parse JWT:", e);
//     return null;
//   }
// };

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [data, setData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!data.email || !data.password) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const responseText = await response.text();

//       if (response.ok) {
//         let parsedResponse;
//         let actualJwtToken;
//         let userRole;

//         try {
//           parsedResponse = JSON.parse(responseText);
//           actualJwtToken = parsedResponse.token;
//           userRole = parsedResponse.role;
//         } catch (jsonParseError) {
//           console.warn("Response not a JSON object:", jsonParseError);
//           actualJwtToken = responseText;
//           const decoded = parseJwt(actualJwtToken);
//           if (decoded && decoded.role) {
//             userRole = decoded.role;
//           } else {
//             setError("Invalid token format received or role not found in JWT.");
//             return;
//           }
//         }

//         if (actualJwtToken && userRole) {
//           setSuccess("🎉 Login Successful!");

//           // Update AuthContext so app rerenders
//           login({ token: actualJwtToken, role: userRole });

//           // Navigate based on role
//           setTimeout(() => {
//             switch (userRole) {
//               case "ADMIN":
//                 navigate("/admin");
//                 break;
//               case "AGENT":
//                 navigate("/agent");
//                 break;
//               case "EMPLOYEE":
//                 navigate("/employee");
//                 break;
//               default:
//                 navigate("/");
//             }
//           }, 1000);
//         } else {
//           setError("Login failed: Token or role missing.");
//         }
//       } else {
//         setError(responseText || "Invalid credentials. Try again.");
//       }
//     } catch (err) {
//       console.error("Login fetch error:", err);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "420px", width: "100%" }}>
//         <div className="text-center mb-4">
//           <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "70px", height: "70px" }}>
//             <i className="bi bi-person-lock fs-2"></i>
//           </div>
//           <h3 className="fw-bold">Welcome Back</h3>
//           <p className="text-muted small">Sign in to your account to continue</p>
//         </div>

//         {error && (
//           <div className="alert alert-danger py-2">{error}</div>
//         )}
//         {success && (
//           <div className="alert alert-success py-2">{success}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               className="form-control"
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
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 className="form-control"
//                 placeholder="••••••••"
//                 required
//               />
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           <div className="d-flex justify-content-end mb-3">
//             <Link to="/forgot-password" className="small text-primary text-decoration-none">
//               Forgot your password?
//             </Link>
//           </div>

//           <button type="submit" className="btn btn-primary w-100 fw-semibold">
//             Sign In
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <p className="small text-muted">
//             Don't have an account?{" "}
//             <Link to="/register" className="fw-semibold text-primary text-decoration-none">
//               Create account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AnimatedBackground from "../components/AnimatedBackground";

// Helper to decode JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Failed to parse JWT:", e);
    return null;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      if (response.ok) {
        let parsedResponse;
        let actualJwtToken;
        let userRole;

        try {
          parsedResponse = JSON.parse(responseText);
          actualJwtToken = parsedResponse.token;
          userRole = parsedResponse.role;
        } catch (jsonParseError) {
          console.warn("Response not a JSON object:", jsonParseError);
          actualJwtToken = responseText;
          const decoded = parseJwt(actualJwtToken);
          if (decoded && decoded.role) {
            userRole = decoded.role;
          } else {
            setError("Invalid token format received or role not found in JWT.");
            return;
          }
        }

        if (actualJwtToken && userRole) {
          setSuccess("🎉 Login Successful!");

          // Update AuthContext so app rerenders
          login({ token: actualJwtToken, role: userRole });

          // Navigate based on role
          setTimeout(() => {
            switch (userRole) {
              case "ADMIN":
                navigate("/admin");
                break;
              case "AGENT":
                navigate("/agent");
                break;
              case "EMPLOYEE":
                navigate("/employee");
                break;
              default:
                navigate("/");
            }
          }, 1000);
        } else {
          setError("Login failed: Token or role missing.");
        }
      } else {
        setError(responseText || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ position: 'relative', zIndex: 1 }}>
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ 
          maxWidth: "420px", 
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <div className="text-center mb-4">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ 
              width: "70px", 
              height: "70px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
            }}>
              <i className="bi bi-person-lock fs-2"></i>
            </div>
            <h3 className="fw-bold text-dark">Welcome Back</h3>
            <p className="text-muted small">Sign in to Help Desk System</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2" style={{ background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.2)" }}>{error}</div>
          )}
          {success && (
            <div className="alert alert-success py-2" style={{ background: "rgba(25, 135, 84, 0.1)", border: "1px solid rgba(25, 135, 84, 0.2)" }}>{success}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Email Address</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="form-control"
                style={{ 
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "2px solid rgba(102, 126, 234, 0.2)",
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
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="form-control"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid rgba(102, 126, 234, 0.2)",
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
                    border: "2px solid rgba(102, 126, 234, 0.2)",
                    borderLeft: "none"
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password" className="small text-decoration-none" style={{ color: "#667eea" }}>
                Forgot your password?
              </Link>
            </div>

            <button type="submit" className="btn w-100 fw-semibold" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)"
            }}>
              Sign In to Help Desk
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="small text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "#667eea" }}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;