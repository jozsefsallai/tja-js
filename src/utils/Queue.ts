export class Queue<T> {
  private _queue: T[] = [];

  get isEmpty() {
    return this._queue.length === 0;
  }

  enqueue(item: T) {
    this._queue.push(item);
  }

  dequeue(): T | undefined {
    return this._queue.shift();
  }

  peek(): T | undefined {
    if (this._queue.length !== 0) {
      return this._queue[0];
    }
  }

  clear() {
    this._queue = [];
  }

  static fromArray<T>(arr: T[]): Queue<T> {
    const queue = new Queue<T>();

    for (const item of arr) {
      queue.enqueue(item);
    }

    return queue;
  }
}
