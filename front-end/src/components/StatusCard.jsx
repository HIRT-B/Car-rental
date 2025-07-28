

export default function StatusCard({ title, count, description, status }) {
  const statusStyles = {
    Active: { borderLeft: '6px solid #28a745' },
    Pending: { borderLeft: '6px solid #f4c04c' },
    Danger: { borderLeft: '6px solid #dc3545' },
  };

  const style = statusStyles[status] || { borderLeft: '6px solid #f4c04c' };

  return (
    <div
      className="card text-white h-100"
      style={{
        backgroundColor: '#111',
        ...style,
        boxShadow: '0 4px 10px rgba(244, 192, 76, 0.15)', // subtle golden glow
        transition: 'all 0.3s ease',
        borderRadius: '12px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(244, 192, 76, 0.35)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(244, 192, 76, 0.15)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{title}</h5>
        <h2 className="text-light fw-bolder">{count}</h2>
        <p className="text-secondary">{description}</p>
      </div>
    </div>
  );
}
