export function TextArea({ label, name, value, onChange }) {
  return (
    <div className="textarea-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows="4" // Adjust the number of rows as needed
        style={{ width: '100%' }}
      />
    </div>
  );
}