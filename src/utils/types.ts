export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
  PAYPAL = "paypal"
}

export enum paymentStatus {
  PENDING = "pending",
  COMPLETE = "complete",
  CANCELLED = "cancelled"
}

export const cardTypes = {
  MASTER_CARD: "MASTER_CARD",
  VISA_CARD: "VISA_CARD"
};

export enum genderType {
  MALE = "male",
  FEMALE = "female"
}

export enum NotificationType {
  WhatsApp = "whatsapp",
  Email = "email"
}

export const countryCodes = {
  NIGERIA: "NG",
  GHANA: "GH",
  KENYA: "KE",
  UGANDA: "UG",
  IVORY_COAST: "CI",
  SENEGAL: "SN"
};

export type AccountHistoryItem = {
  date: string;
  amount: number;
  description: string;
  transaction: string;
  createdAt: Date;
  lastBalance: any;
  currentBalance: any;
  type: TransactionType;
};

export type Payload = {
  accountHistory: AccountHistoryItem[];
};

export type AmountItem = {
  lastBalance: number;
  balance: number;
};

export type TemplateDataParams = {
  payload: { accountHistory: AccountHistoryItem[]; account: AmountItem }; // Replace `any[]` with a more specific type if possible
  filter: { startDate: string; endDate: string }; // Replace `any` with a specific type
};

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married"
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled"
}

export const ServiceType = {
  Content: "Content Creation & Strategy",
  Branding: "Branding and Design",
  Marketing: "Marketing Consulting",
  Digital: "Digital Marketing Management"
};

export enum BusinessType {
  Content = "Content Creation & Strategy",
  Branding = "Branding and Design",
  Marketing = "Marketing Consulting",
  Digital = "Digital Marketing Management"
}

export enum RoleType {
  User = "User",
  Admin = "Admin",
  ThemeUser = "ThemeUser"
}
