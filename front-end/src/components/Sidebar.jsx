
import { FaTachometerAlt, FaCar, FaCalendarAlt, FaUsers, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  const items = [
    {href:'/admin/',         icon:<FaTachometerAlt/>, label:'Dashboard'},
    {href:'/admin/cars',      icon:<FaCar/>,           label:'Cars'},
    {href:'/admin/rentals',   icon:<FaCalendarAlt/>,   label:'Rentals'},
    {href:'/admin/users',     icon:<FaUsers/>,         label:'Users'},
    {href:'/admin/settings',  icon:<FaCog/>,           label:'Settings'},
  ];
  return (
    <div className="custom-sidebar">
      <ul className="sidebar-menu">
        {items.map((item) => (
          <li key={item.href} className="sidebar-item">
            <a href={item.href} className="sidebar-link">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
