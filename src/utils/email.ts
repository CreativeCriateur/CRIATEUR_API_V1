type EmailPayload = {
  recipients: string[];
  subject: string;
  html: string;
  from?: {
    email?: string;
    name?: string;
  };
  cc?: string[];
  attachments?: string[];
};
