import logo from "./logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div style={{
      position: "sticky",   
      top: 0,               
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 12px 6px 100px",      
      backgroundColor: "#1e293b",
      color: "white",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.3)"
    }}>

      <div style={{ display: "flex", alignItems: "center" }}>
        
        <img 
          src={logo} 
          alt="logo"
          style={{ width: "200px", height: "80px" ,marginBottom: "-10px",marginTop:"-10px"}}
        />

    

      
      <div style={{ fontSize:"20px",display: "flex", gap: "30px",marginBottom:"-10px"}}>
          <span className="nav-item">Create Poll</span>
          <span className="nav-item">Schedule Meeting</span>
          <span className="nav-item">Demo</span>
          <span className="nav-item">Pricing</span>
        </div>
    
    </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center",marginRight: "100px"  }}>
        
        <button className="login" onClick={() => navigate('/login')}>Login</button>
        <button className="signup">Sign Up</button>

      </div>

    </div>
  );
}

export default Navbar;