import React from 'react';

const NewAnimatedBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      {/* Floating Books Animation */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-200px',
          width: '100%',
          height: '100%',
          animation: 'floatBooks 20s linear infinite',
        }}
      >
        {/* Book 1 */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '40px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            animation: 'float1 15s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '8px 0',
            }}
          />
          <div
            style={{
              width: '80%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              margin: '4px auto',
            }}
          />
        </div>

        {/* Book 2 */}
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '30%',
            width: '35px',
            height: '45px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            animation: 'float2 18s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '6px 0',
            }}
          />
          <div
            style={{
              width: '85%',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              margin: '3px auto',
            }}
          />
        </div>

        {/* Book 3 */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '60%',
            width: '38px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '4px',
            animation: 'float3 22s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '7px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '7px 0',
            }}
          />
          <div
            style={{
              width: '75%',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              margin: '4px auto',
            }}
          />
        </div>

        {/* Book 4 */}
        <div
          style={{
            position: 'absolute',
            top: '65%',
            left: '20%',
            width: '42px',
            height: '52px',
            background: 'rgba(255, 255, 255, 0.09)',
            borderRadius: '4px',
            animation: 'float4 16s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '8px 0',
            }}
          />
          <div
            style={{
              width: '90%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              margin: '4px auto',
            }}
          />
        </div>

        {/* Book 5 */}
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            width: '36px',
            height: '46px',
            background: 'rgba(255, 255, 255, 0.11)',
            borderRadius: '4px',
            animation: 'float5 19s ease-in-out infinite',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '7px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              margin: '7px 0',
            }}
          />
          <div
            style={{
              width: '80%',
              height: '5px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '2px',
              margin: '3px auto',
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatBooks {
          0% {
            transform: translateX(-200px);
          }
          100% {
            transform: translateX(calc(100vw + 200px));
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg);
          }
          75% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-25px) rotate(-5deg);
          }
          66% {
            transform: translateY(-5px) rotate(3deg);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          20% {
            transform: translateY(-15px) rotate(4deg);
          }
          40% {
            transform: translateY(-30px) rotate(-2deg);
          }
          60% {
            transform: translateY(-20px) rotate(6deg);
          }
          80% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }

        @keyframes float4 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          30% {
            transform: translateY(-20px) rotate(-4deg);
          }
          70% {
            transform: translateY(-25px) rotate(5deg);
          }
        }

        @keyframes float5 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-18px) rotate(3deg);
          }
          50% {
            transform: translateY(-28px) rotate(-4deg);
          }
          75% {
            transform: translateY(-12px) rotate(2deg);
          }
        }
      `}</style>

      {/* Overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default NewAnimatedBackground;