# EmailJS Template Markup

Use these templates inside your EmailJS dashboard to replace the current plain layout.

## Shared HTML Email Body

Paste this into the template content area:

```html
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f7fb;margin:0;padding:0;width:100%;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8edf5;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <tr>
          <td style="background:#1f3c88;padding:24px 28px;color:#ffffff;">
            <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Maraseq Group</div>
            <div style="font-size:26px;font-weight:700;line-height:1.2;margin-top:6px;">New {{context}} Submission</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;">
            <p style="margin:0 0 18px 0;color:#334155;font-size:15px;line-height:1.7;">
              A new message has been received from <strong>{{name}}</strong>.
            </p>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0 10px;">
              <tr>
                <td style="width:120px;color:#64748b;font-size:14px;vertical-align:top;">Name</td>
                <td style="color:#0f172a;font-size:14px;font-weight:600;">{{name}}</td>
              </tr>
              <tr>
                <td style="width:120px;color:#64748b;font-size:14px;vertical-align:top;">Email</td>
                <td style="color:#0f172a;font-size:14px;font-weight:600;">{{email}}</td>
              </tr>
              <tr>
                <td style="width:120px;color:#64748b;font-size:14px;vertical-align:top;">Subject</td>
                <td style="color:#0f172a;font-size:14px;font-weight:600;">{{subject}}</td>
              </tr>
            </table>

            <div style="margin-top:24px;padding:20px 22px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
              <div style="font-size:13px;font-weight:700;color:#1f3c88;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">Message</div>
              <div style="color:#0f172a;font-size:14px;line-height:1.8;white-space:pre-line;">{{html_message}}</div>
            </div>

            <div style="margin-top:24px;font-size:12px;color:#94a3b8;line-height:1.6;">
              This email was sent via EmailJS from the Maraseq website.
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## Recommended Subject Lines

### Contact Us
```text
Contact Us: {{subject}}
```

### Newsletter
```text
Newsletter Subscription: {{email}}
```

### Support
```text
Support Request: {{subject}}
```

## Recommended EmailJS Variables

Make sure your template can read these fields:

- `name`
- `email`
- `subject`
- `context`
- `html_message`
- `message`
- `reply_to`
- `to_email`

## Optional: Separate Template Variants

If you want different wording per form, duplicate the template and change only the header text:

### Contact Variant Header
```html
<div style="font-size:26px;font-weight:700;line-height:1.2;margin-top:6px;">New Contact Message</div>
```

### Newsletter Variant Header
```html
<div style="font-size:26px;font-weight:700;line-height:1.2;margin-top:6px;">New Newsletter Signup</div>
```

### Support Variant Header
```html
<div style="font-size:26px;font-weight:700;line-height:1.2;margin-top:6px;">New Support Request</div>
```

## Notes

- Keep `{{html_message}}` in the content area if you want the composed message block to render nicely.
- If you use a single shared EmailJS template, the `context` field lets the same design work for contact, newsletter, and support.
- For newsletter forms that only send an email field, the template will still render correctly because the helper sends `name`, `email`, and `message` consistently.
