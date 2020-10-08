export default interface ICreateMonitoringDTO {
  name: string;
  user_id: string;
  teacher_id: string;
  monitor_id?: string;
  isAvailable?: boolean;
  room?: string;
  schedule?: string;
  day?: string;
}
