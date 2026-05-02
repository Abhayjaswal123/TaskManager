export const calculatePriority = (importance, deadline) => {
    const now = new Date();
    const due = new Date(deadline);

    const diffTime = due - now;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    let urgency = 1;

    if (diffDays <= 1) urgency = 3;
    else if (diffDays <= 3) urgency = 2;
    else urgency = 1;

    const score = (importance * 2) + (urgency * 3);

    let tag = "Normal";
    if (score >= 12) tag = "Urgent";
    else if (score >= 8) tag = "Important";

    return { score, tag };
};