export function TextInput({ label, name, value, onChange }) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}