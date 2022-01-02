export interface Update {
  id: string;
  author: string;
  body: string;
  date: string;
  position: string;
}

export interface Race {
  id: string;
  boathouse: string;
  end_date: string;
  location: string;
  race_name: string;
  start_date: string;
}
