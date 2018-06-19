import {Alert} from '../models/alert';

export class AlertManager {

  alerts: Alert[] = [];
  // set to < 0 if no timeout is desired
  timeout: number;
  count = 0;

  constructor(timeout = 10 * 1000) {
    this.timeout = timeout;
  }

  public async addAlert(alert) {
    alert.id = this.count ++;
    this.alerts.push(alert);

    // remove after ALERT_TIMEOUT occurs
    if (this.timeout < 0) {
      return;
    }

    const removeId = this.count - 1;
    await this.sleep(this.timeout);
    this.alerts = this.alerts.filter(a => a.id !== removeId);
  }

  public getAlerts() {
    return this.alerts;
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
