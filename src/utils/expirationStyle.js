export function getExpirationStyle(expiresAt) {
    const today = new Date();
    const expirationDate = new Date(expiresAt);

    today.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // vencido
    if (diffDays <= 0) {
        return {
            border: "border-danger",
            text: "text-danger",
        };
    }

    //vence em 03 dias
    if (diffDays <= 3) {
        return {
            border: "border-danger",
            text: "text-danger",
        };
    }

    //vence em uma semana
    if (diffDays <= 7) {
        return {
            border: "border-warning",
            text: "text-warning"
        };
    }

    if (diffDays >= 8 && diffDays <= 15) {
        return {
            border: "border-info",
            text: "text-info"
        }
    }

    //pazo maior do que uma semana
    return {
        border: "border-success",
        text: "text-success"
    }
}