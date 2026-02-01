export default function FilterMonthsComponent({
    months,
    onMonthsChange
}) {
    return (
        <div className="mb-3 d-flex align-items-center gap-2">
            <label htmlFor="daysSelect" className="form-label mb-0">
                Mostrar produtos em:
            </label>

            <select
                id="daysSelect"
                className="form-select w-auto"
                value={months}
                onChange={(e) => onMonthsChange(Number(e.target.value))}
            >
                <option value={1}>1 mês</option>
                <option value={2}>2 meses</option>
                <option value={3}>3 meses</option>
            </select>
        </div>
    );
}