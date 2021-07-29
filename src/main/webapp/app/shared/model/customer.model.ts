import { IIncident } from 'app/shared/model/incident.model';

export interface ICustomer {
  id?: number;
  code?: number | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  incidents?: IIncident[] | null;
}

export const defaultValue: Readonly<ICustomer> = {};
