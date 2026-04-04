import emailjs from "@emailjs/browser";

export const submitMailForm = async (event, { to, subject, context } = {}) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    if (typeof window === "undefined" || !to || !formElement) {
        return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const formData = new FormData(formElement);
    const details = [];
    const detailsObject = {};
    const senderName = String(formData.get("name") || formData.get("yourname") || "Website Visitor").trim();
    const senderEmail = String(formData.get("email") || formData.get("youremail") || "").trim();

    formData.forEach((value, key) => {
        const normalizedValue = String(value ?? "").trim();

        if (!normalizedValue) {
            return;
        }

        if (key === "agree" && normalizedValue.toLowerCase() === "on") {
            return;
        }

        details.push(`${key}: ${normalizedValue}`);
        detailsObject[key] = normalizedValue;
    });

    const bodyLines = [];

    if (context) {
        bodyLines.push(`Context: ${context}`);
        bodyLines.push("");
    }

    if (details.length > 0) {
        bodyLines.push(...details);
    } else {
        bodyLines.push("No form details were provided.");
    }

    const body = bodyLines.join("\n");

    if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.");
        window.alert("Email sending is not configured yet.");
        return;
    }

    try {
        await emailjs.send(
            serviceId,
            templateId,
            {
                to_email: to,
                to_name: to,
                subject: subject || "Website Form Submission",
                context: context || "Website",
                message: body,
                html_message: body,
                name: senderName,
                email: senderEmail,
                from_name: senderName,
                from_email: senderEmail,
                reply_to: senderEmail,
                form_data: JSON.stringify(detailsObject, null, 2),
            },
            {
                publicKey,
            }
        );

        formElement.reset();
        window.alert("Your message has been sent successfully.");
    } catch (error) {
        console.error("EmailJS send failed:", error);
        window.alert("Failed to send your message. Please try again.");
    }
};