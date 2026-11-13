CREATE TABLE IF NOT EXISTS portfolio_inquiries (
    id uuid PRIMARY KEY,
    inquiry_type text NOT NULL CHECK (inquiry_type IN ('role', 'project', 'other')),
    reply_email text NOT NULL CHECK (char_length(reply_email) BETWEEN 3 AND 254),
    message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
    rate_key text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    notification_attempted_at timestamptz,
    notification_sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS portfolio_inquiries_rate_key ON portfolio_inquiries (rate_key);
CREATE INDEX IF NOT EXISTS portfolio_inquiries_pending ON portfolio_inquiries (created_at)
    WHERE notification_sent_at IS NULL;

ALTER TABLE portfolio_inquiries ENABLE ROW LEVEL SECURITY;
