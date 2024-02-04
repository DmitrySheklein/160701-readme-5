import { DynamicModule } from '@nestjs/common';
import { FetchDataService } from './fetch-data.service';
import { HttpModule } from '@nestjs/axios';

export type FetchDataModuleOptions = {
  baseUrl: string;
};
export const FETCH_DATA_OPTIONS = Symbol('FETCH_DATA_OPTIONS');

export class FetchDataModule {
  static register(options: FetchDataModuleOptions): DynamicModule {
    return {
      global: true,
      module: FetchDataModule,
      imports: [HttpModule],
      providers: [
        // Регистрируем объект настроек в
        // качестве провайдера. Значением
        // для провайдера является константа
        // `FETCH_DATA_OPTIONS`. В ней
        // находится символ.
        {
          provide: FETCH_DATA_OPTIONS,

          // В качестве значения регистрируем
          // объект настроек
          useValue: options,
        },
        FetchDataService,
      ],
      exports: [FetchDataService],
    };
  }
}
