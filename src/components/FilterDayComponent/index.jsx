export default function DaysFilterComponent({
    days,
    onDaysChange
}) {
    return (
        <div className="mb-3 d-flex align-items-center gap-2">
            <label htmlFor="daysSelect" className="form-label mb-0">
                Mostrar produtos que vencem em:
            </label>

            <select
                id="daysSelect"
                className="form-select w-auto"
                value={days}
                onChange={(e) => onDaysChange(Number(e.target.value))}
            >
                <option value={0}>hoje</option>
                <option value={2}>2 dias</option>
                <option value={3}>3 dias</option>
                <option value={5}>5 dias</option>
                <option value={7}>7 dias</option>
                <option value={10}>10 dias</option>
                <option value={15}>15 dias</option>
                <option value={30}>30 dias</option>
            </select>
        </div>
    );
}
