import React from "react";

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <style>
        {`
          .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .animated-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
          }
          
          @keyframes backgroundShift {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-10px, -10px) scale(1.05); }
          }
          
          .floating-icon {
            position: absolute;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
            pointer-events: none;
          }
          
          .floating-icon:nth-child(1) {
            top: 10%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 8s;
          }
          
          .floating-icon:nth-child(2) {
            top: 20%;
            right: 10%;
            animation-delay: 1s;
            animation-duration: 7s;
          }
          
          .floating-icon:nth-child(3) {
            top: 60%;
            left: 5%;
            animation-delay: 2s;
            animation-duration: 9s;
          }
          
          .floating-icon:nth-child(4) {
            bottom: 20%;
            right: 15%;
            animation-delay: 3s;
            animation-duration: 6s;
          }
          
          .floating-icon:nth-child(5) {
            top: 70%;
            right: 5%;
            animation-delay: 4s;
            animation-duration: 8s;
          }
          
          .floating-icon:nth-child(6) {
            top: 40%;
            left: 80%;
            animation-delay: 5s;
            animation-duration: 7s;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.6;
            }
          }
          
          .ticket-element {
            position: absolute;
            width: 120px;
            height: 80px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            animation: ticketFloat 12s linear infinite;
            pointer-events: none;
          }
          
          .ticket-element::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            height: 3px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
          }
          
          .ticket-element::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 10px;
            right: 30px;
            height: 2px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 1px;
          }
          
          .ticket-1 {
            top: -100px;
            left: 15%;
            animation-delay: 0s;
          }
          
          .ticket-2 {
            top: -100px;
            left: 65%;
            animation-delay: 6s;
          }
          
          .ticket-3 {
            top: -100px;
            left: 35%;
            animation-delay: 12s;
          }
          
          @keyframes ticketFloat {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          .support-waves {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.05));
            overflow: hidden;
          }
          
          .support-waves::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E") repeat-x;
            animation: waveAnimation 15s linear infinite;
          }
          
          @keyframes waveAnimation {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      
      {/* Floating Support Icons */}
      <div className="floating-icon">🎫</div>
      <div className="floating-icon">💬</div>
      <div className="floating-icon">🛠️</div>
      <div className="floating-icon">📋</div>
      <div className="floating-icon">⚡</div>
      <div className="floating-icon">🎯</div>
      
      {/* Animated Tickets */}
      <div className="ticket-element ticket-1"></div>
      <div className="ticket-element ticket-2"></div>
      <div className="ticket-element ticket-3"></div>
      
      {/* Support Waves */}
      <div className="support-waves"></div>
    </div>
  );
};

export default AnimatedBackground;