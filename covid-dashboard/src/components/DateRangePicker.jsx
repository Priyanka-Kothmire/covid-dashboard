const DateRangePicker = ({ startDate, endDate, onChange }) => {
  return (
    <div className="date-range-picker">
      <label>
        From:{' '}
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
        />
      </label>
      <label>
        To:{' '}
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
        />
      </label>
    </div>
  );
};

export default DateRangePicker;
