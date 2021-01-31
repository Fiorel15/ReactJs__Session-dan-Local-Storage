import React from 'react';
import Main from './Components/Main';
import logo from './logoTelkom.png';
import {Link} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {
    return(
      <div>
            <nav className="nav">
              <div className="logo">
                <div class="logo-icon">
                      <img src={logo} alt="Logo" />
                </div>
                  <span>PERPUSTAKAAN</span>
              </div>
            
                  <div className="show white"></div>
                  <ul className="nav-list">
                    <div>
                      <li className="nav-item">
                            <Link to="/">Beranda</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/list2">Daftar Siswa</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/list">Petugas</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart">Keranjang Belanja</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kontak">Kontak</Link>
                        </li>
                        
                    </div>
                    <span class="hide black">x</span>
                  </ul>
            </nav>
        <p><Main /></p>  
      </div>   
    );
  }
}

export default App;
