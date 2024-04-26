import "./TableStyle.css";

interface TableProps {
  header: string[];
  data: string[];
}

export default function Table({ header, data }: TableProps) {
  const tableHeader = header.map((h, index) => {
    return <th key={index}>{h}</th>;
  });

  const tableData = data.map((d, index) => {
    return <td key={index}>{d}</td>;
  });

  return (
    <table>
      <tr>{tableHeader}</tr>
      <tr>{tableData}</tr>
    </table>
  );
}
