import {Alert} from '../models/alert';

export class AlertManager {

  private alerts: Alert[] = [];
  // set to < 0 if no timeout is desired
  timeout: number;
  private count = 0;

  constructor(timeout = 10 * 1000) {
    this.timeout = timeout;
  }

  private async addAlert(alert) {
    alert.id = this.count++;
    this.alerts.push(alert);

    // remove after ALERT_TIMEOUT occurs
    if (this.timeout < 0) {
      return;
    }

    const removeId = this.count - 1;
    await this.sleep(this.timeout);
    this.alerts = this.alerts.filter(a => a.id !== removeId);
  }

  public addPrimaryAlert(content) {
    this.addAlert({type: 'primary', text: content});
  }

  public addSecondaryAlert(content) {
    this.addAlert({type: 'secondary', text: content});
  }

  public addSuccessAlert(content) {
    this.addAlert({type: 'success', text: content});
  }

  public addDangerAlert(content) {
    this.addAlert({type: 'danger', text: content});
  }

  public addWarningAlert(content) {
    this.addAlert({type: 'warning', text: content});
  }

  public addInfoAlert(content) {
    this.addAlert({type: 'info', text: content});
  }

  public addLightAlert(content) {
    this.addAlert({type: 'light', text: content});
  }

  public addDarkAlert(content) {
    this.addAlert({type: 'dark', text: content});
  }

  public getAlerts() {
    return this.alerts;
  }

  public clearAlerts() {
    this.alerts = [];
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
