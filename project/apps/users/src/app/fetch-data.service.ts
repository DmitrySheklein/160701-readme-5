import { Inject, Injectable } from '@nestjs/common';
import {
  FETCH_DATA_OPTIONS,
  FetchDataModuleOptions,
} from './fetch-data.module';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FetchDataService {
  constructor(
    // Внедряем объект настроек в качестве
    // зависимости. Для этого используем декоратор
    // Inject.
    @Inject(FETCH_DATA_OPTIONS) private options: FetchDataModuleOptions,

    // Также внедряем HttpService. Воспользуемся
    // им для отправки запросов серверу.
    private readonly httpService: HttpService
  ) {}

  // Метод для отправки запросов серверу
  public async fetch(route: string) {
    const url = `${this.options.baseUrl}${route}`;
    return this.httpService.axiosRef.get(url);
  }
}
