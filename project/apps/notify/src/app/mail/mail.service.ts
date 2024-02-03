import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { EMAIL_SUBJECT } from './mail.constant';
import { Subscriber } from '@project/libs/shared/app/types';
import { mailConfig } from '@project/config/notify';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(mailConfig.KEY)
    private readonly notifyConfig: ConfigType<typeof mailConfig>
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyChangePassword(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.ChangePassword,
      template: './change-password',
      context: {
        user: `${subscriber.firstname}`,
      },
    });
  }
}
