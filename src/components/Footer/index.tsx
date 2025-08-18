import React from 'react';
import './index.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Nhãn hàng */}
        <div className="footer-section">
          <div className="footer-section-title">NHÃN HÀNG</div>
          <div className="footer-brand-name">Viettien</div>
          <div>Viettien Smart Casual</div>
          <div>Converse</div>
          <div>Viettien Kids</div>
          <div>San Sciaro</div>
          <div>T-up</div>
          <div>Nike</div>
          <div>Skechers</div>
        </div>
        {/* Tin tức */}
        <div className="footer-section">
          <div className="footer-section-title">TIN TỨC</div>
          <div>Tin Viettien</div>
          <div>Tin thị trường</div>
          <div>Tin khuyến mãi</div>
          <div>Hoạt động cộng đồng</div>
        </div>
        {/* Hỗ trợ khách hàng */}
        <div className="footer-section">
          <div className="footer-section-title">HỖ TRỢ KHÁCH HÀNG</div>
          <div>Khách hàng thân thiết</div>
          <div>Chế độ thu đổi</div>
          <div>Góp ý khách hàng</div>
          <div className="footer-highlight">MỞ ĐẠI LÝ</div>
        </div>
        {/* Liên hệ */}
        <div className="footer-section">
          <div className="footer-section-title">LIÊN HỆ</div>
          <div>7 Lê Minh Xuân, P.7, Q. Tân Bình, Tp.HCM, Việt Nam</div>
          <div className="footer-link">Tel: 028. 3864 0800</div>
          <div>Fax: 028. 3864 5085</div>
          <div>Email: viettien@viettien.com.vn</div>
          <div className="footer-highlight-large">KẾT NỐI VỚI CHÚNG TÔI</div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <div className="footer-social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.35c0-.734-.593-1.326-1.326-1.326z"/></svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer; 