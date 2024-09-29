import "./TableStyle.css";

interface TableProps {
  header: string[];
  data: string[][];
}

export default function Table({ header, data }: TableProps) {
  const tableHeader = header.map((h, index) => {
    return <th key={index}>{h}</th>;
  });

  const tableRows = data.map((row, rowIndex) => {
    const rowData = row.map((entry, columnIndex) => {
      return <td key={columnIndex}>{entry}</td>;
    });
    return <tr key={rowIndex}>{rowData}</tr>;
  });

  return (
    <table>
      <tr id="tr-head">{tableHeader}</tr>
      <>{tableRows}</>
    </table>
  );
}
