export default function Status({ bgstatus = '', typestatus = '', mode }) {

    const className =
    mode === "card"
      ? `status-card status-${bgstatus.toLowerCase().replace(/\s+/g, '-')}`
      : `status-table status-${bgstatus.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <>
      <span className={className}>
        {typestatus}
      </span>
    </>
  );
}
