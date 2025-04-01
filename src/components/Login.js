import { useState } from "react";
import { FaUser } from 'react-icons/fa'; // Icône utilisateur

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    return (
        <>
<div className="col-sm-6 col-xs-12 text-right">
              <div className="login-icon" style={{padding: '4px'}}>
                  <button onClick={openModal} className="icon-btn">
                    <FaUser size={20} />
                  </button>
              </div>
            </div>
            <style>
        {`
        .login-icon {
          display: inline-block;
          margin-left: 10px;
          position: relative;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2em;
          color:rgb(190, 190, 190);
          transition: color 0.3s;
        }

        .icon-btn:hover {
          color: #6b4600f1;
        }
        `}
      </style>
      {/* Fenêtre modale de connexion avec des styles en ligne pour le debug */}
      {isModalOpen && (
        <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '400px',
            position: 'relative',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#555',
            }}
          >
            &times;
          </button>
          <img 
              src="images/Sainte.jpg" 
              className="img-responsive" 
              alt="Free HTML5 Bootstrap Template by FreeHTML5.co"
              style={{
                display: 'block',
                margin: 'auto',
                width: '5em', 
                height: 'auto', 
                maxWidth: '100%',
              }} 
            />
            
            <form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ fontWeight: 'bold', color: '#555' }}>Email</label>
              <input
                type="email"
                // id="email"
                placeholder="Entrez votre email"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: '0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#6b4600f1'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password" style={{ fontWeight: 'bold', color: '#555' }}>Mot de passe</label>
              <input
                type="password"
                // id="password"
                placeholder="Entrez votre mot de passe"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: '0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#6b4600f1'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </div>
            <hr />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#8d5e08f1',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#6b4600f1'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8d5e08f1'}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
      
      )}

        </>
    );
  };
  
  export default Login;
  