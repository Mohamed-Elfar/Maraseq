const normalizePositionToken = (value) => {
    const token = String(value || "").trim().toLowerCase();

    if (!token) {
        return "";
    }

    if (token === "all") {
        return "both";
    }

    return token;
};

const splitPositionString = (value) => {
    return String(value || "")
        .split(/[,|;/]+/)
        .map((item) => normalizePositionToken(item))
        .filter(Boolean);
};

export const getPositionTokens = (position) => {
    if (Array.isArray(position)) {
        return position
            .map((item) => normalizePositionToken(item))
            .filter(Boolean);
    }

    return splitPositionString(position);
};

export const canShowAtPosition = (position, targetPosition) => {
    const target = normalizePositionToken(targetPosition);
    const tokens = getPositionTokens(position);

    if (tokens.length === 0 || !target) {
        return false;
    }

    return tokens.includes("both") || tokens.includes(target);
};