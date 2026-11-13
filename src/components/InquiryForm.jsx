import { FiArrowUpRight } from "react-icons/fi";
import { useRef, useState } from "react";

const errors = {
  400: "Check your reply email and enter a message between 10 and 2,000 characters.",
  429: "Too many recent submissions. Try again later or use the email link.",
};

export default function InquiryForm() {
  const [status, setStatus] = useState({ state: "idle", text: "" });
  const attempt = useRef(null);
  const sending = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (sending.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = JSON.stringify({
      type: values.get("type"),
      email: values.get("email").trim(),
      message: values.get("message").trim(),
    });
    if (values.get("message").trim().length < 10) {
      setStatus({ state: "error", text: errors[400] });
      form.elements.message.focus();
      return;
    }

    sending.current = true;
    setStatus({ state: "pending", text: "Sending your message…" });
    try {
      if (attempt.current?.payload !== payload) {
        attempt.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.id },
        body: payload,
        signal: AbortSignal.timeout(18_000),
      });
      if (!response.ok) {
        if (response.status === 409) attempt.current = null;
        setStatus({
          state: "error",
          text: errors[response.status] ?? "I couldn’t confirm receipt. Your message is still here. Try again or use the email link.",
        });
        return;
      }
      const result = await response.json();
      if (result.received !== true) throw new Error("Unexpected response");

      form.reset();
      attempt.current = null;
      setStatus({ state: "success", text: "Thanks. Your message was received." });
    } catch {
      setStatus({ state: "error", text: "I couldn’t confirm receipt. Your message is still here. Try again or use the email link." });
    } finally {
      sending.current = false;
    }
  }

  const pending = status.state === "pending";

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <fieldset disabled={pending} aria-label="Send an inquiry">
        <div className="inquiry-fields">
          <label>
            What’s it about?
            <select name="type" required defaultValue="">
              <option value="" disabled>Choose a topic</option>
              <option value="role">An engineering role</option>
              <option value="project">A client project</option>
              <option value="other">Something else</option>
            </select>
          </label>
          <label>
            Your email
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
        </div>
        <label>
          Your message
          <textarea name="message" rows="4" minLength={10} maxLength={2000} required />
        </label>
        <button className="button inquiry-submit" type="submit">
          {pending ? "Sending…" : "Send inquiry"} <FiArrowUpRight className="link-icon" aria-hidden="true" />
        </button>
      </fieldset>
      <p className="inquiry-status" data-state={status.state} role="status">{status.text}</p>
    </form>
  );
}
