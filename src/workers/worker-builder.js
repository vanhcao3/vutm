export default class WorkerBuilder extends Worker {
  constructor(worker, name) {
    const code = worker.toString();
    const blob = new Blob([`(${code})()`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob), { type: 'module', name: name });
  }
}
