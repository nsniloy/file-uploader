import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async sendEmail(emails: string[], subject: string, body: string) {
    try {
    } catch (error) {
      Logger.error(error, 'EmailHelper');
    }
  }
}
