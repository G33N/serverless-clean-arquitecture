export abstract class ValueObject<T extends Record<string, unknown>> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  public getValue(): T {
    return this.value
  }

  public equals(o: ValueObject<T>): boolean {
    return this.getValue() === o.getValue()
  }

  toJSON() {
    return this.toString()
  }

  toString() {
    if (this.value) {
      return this.value.toString()
    }

    return this.value
  }

  valueOf() {
    return this.value
  }
}
