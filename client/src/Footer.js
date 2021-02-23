import './Footer.scss';

function Footer() {
  const now = new Date();

  return (
    <footer className="footer">
      <div className="container">
        Copyright &copy; {now.getFullYear()} Dev/Mission
      </div>      
    </footer>
  );
}

export default Footer;
