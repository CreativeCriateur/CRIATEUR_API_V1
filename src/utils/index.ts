import { NotificationType, TemplateDataParams } from "./types";
import moment from "moment-timezone";

import { TransactionType } from "./types";
import { Payload } from "./types";
import * as path from "path";
import * as fs from "fs";

export const templateData = ({ payload, filter }: TemplateDataParams) => {
  const currentMoment = moment();
  const today = currentMoment.format("DD-MM-YYYY");
  const previousMonth = currentMoment.subtract(1, "month");
  const month = previousMonth.format("MMMM");
  const year = previousMonth.format("YYYY");
  let openingBalance;
  let closingBalance;
  const startDates: any = [];
  const endDates: any = [];

  payload.accountHistory.map((transaction) => {
    if (
      filter.startDate <= moment(transaction.createdAt).format("DD-MM-YYYY")
    ) {
      startDates.push(moment(transaction.createdAt));
    }
  });
  const minimumDate = moment.min(startDates);

  payload.accountHistory.map((transaction) => {
    if (minimumDate.isSame(moment(transaction.createdAt))) {
      return (openingBalance = transaction.lastBalance);
    } else {
      return (openingBalance = payload.account.lastBalance);
    }
  });

  payload.accountHistory.map((transaction) => {
    if (filter.endDate >= moment(transaction.createdAt).format("DD-MM-YYYY")) {
      endDates.push(moment(transaction.createdAt));
    }
  });
  const maximumDate = moment.max(endDates);
  payload.accountHistory.map((transaction) => {
    if (maximumDate.isSame(moment(transaction.createdAt))) {
      return (closingBalance = transaction.currentBalance);
    } else {
      return (closingBalance = payload.account.balance);
    }
  });

  const noOfDebitTransaction = payload.accountHistory.filter(
    (transaction) => transaction.type === TransactionType.DEBIT
  ).length;

  const noOfCreditTransaction = payload.accountHistory.filter(
    (transaction) => transaction.type === TransactionType.CREDIT
  ).length;

  return {
    today,
    month,
    year,
    openingBalance,
    closingBalance,
    noOfDebitTransaction,
    noOfCreditTransaction
  };
};

export interface ISendTemplateMessage {
  messages: {
    to: string;
    content: {
      templateName: string;
      templateData: {
        body: {
          placeholders: (string | number)[];
        };
        buttons?: [
          {
            type: string;
            parameter: string;
          }
        ];
      };
      language: string;
    };
  }[];
}

export interface IEmailTemplate {
  recipients: string[];
  subject: string;
  html: string;
  from: { email?: string; name?: string };
  cc: string[];
  attachments: string[];
}

export interface INotification {
  template: ISendTemplateMessage | IEmailTemplate;
  title: string;
  userId: string;
  origin: string;
  originId: string;
  templateName: string;
  notificationType: NotificationType;
  payload: any;
}

export const getEmailTemplate = (filename: string, nested_folder?: string) => {
  let pathURL = path.join(__dirname, `../../templates/${filename}.html`);

  if (nested_folder) {
    pathURL = path.join(
      __dirname,
      `../../templates/${nested_folder}/${filename}.html`
    );
  }

  return fs.readFileSync(pathURL, "utf-8");
};

export const SUPPORTED_FRENCH_COUNTRY = ["CI"];
