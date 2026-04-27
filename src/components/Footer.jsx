import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="cta">
        <div className="cta-left">
          <h1>
            Ready to get started? <br />
            <span>It's free!</span>
          </h1>
        </div>

        <div className="cta-right">
          <button className="btn light">Create a poll</button>
          <button className="btn purple">Sign up</button>
        </div>
      </div>

      <div className="footer">
        <div className="footer-container">
          
          <div className="footer-col">
            <h2 className="logo">StrawPoll</h2>
            <p>
              Making it easy to create instant, real-time polls and surveys for free.
            </p>

            <div className="socials">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <button className="language">Choose Language ▼</button>
          </div>

          <div className="footer-col">
            <h4>SOLUTIONS</h4>
            <p style={{color: "blueviolet"}}>Poll Maker</p>
            <p style={{color: "blueviolet"}}>Meeting Scheduler</p>
            <p style={{color: "blueviolet"}}>Discord Bot</p>
            <p style={{color: "blueviolet"}}>Poll API</p>
          </div>

          <div className="footer-col">
            <h4>SUPPORT</h4>
            <p style={{color: "blueviolet"}}>Pricing</p>
            <p style={{color: "blueviolet"}}>Help Center</p>
            <p style={{color: "blueviolet"}}>Guides</p>
            <p style={{color: "blueviolet"}}>F.A.Q.</p>
            <p style={{color: "blueviolet"}}>Integrations</p>
          </div>

          <div className="footer-col">
            <h4>COMPANY</h4>
            <p style={{color: "blueviolet"}}>About</p>
            <p style={{color: "blueviolet"}}>Imprint</p>
            <p style={{color: "blueviolet"}}>Contact</p>
          </div>

          <div className="footer-col">
            <h4>LEGAL</h4>
            <p style={{color: "blueviolet"}}>Privacy</p>
            <p style={{color: "blueviolet"}}>Terms</p>
          </div>

        </div>

        <div className="copyright">
          © 2025 StrawPoll. All rights reserved.
        </div>
      </div>
    </>
  );
}

export default Footer;