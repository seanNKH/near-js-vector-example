import { NearBindgen, near, call, view, UnorderedMap, Vector } from 'near-sdk-js'

@NearBindgen({})
class Counter {
  val: number = 0;
  outerMap: UnorderedMap<string>;
  messages: Vector<string>;
  constructor(){
    this.messages = new Vector<string>('my_prefix_');
    this.outerMap = new UnorderedMap<string>('ppp');
  }
  @view({}) // Public read-only method: Returns the counter value.
  get_num(): number {
    return this.val
  }

  @call({}) // Public method: Increment the counter.
  increment() {
    this.val += 1;
    near.log(`Increased number to ${this.val}`)
  }

  @call({}) // Public method: Decrement the counter.
  addData({num}:{num:number}) {
    this.messages.push(`hello${num}`);
    this.messages.push(`world${num}`);
  }

  @view({})
  getData() {
    // return this.messages.toArray();
    const data = this.messages.toArray();
    let tmp = [];
    for (let i = 0; i < data.length; i++) {
        tmp.push(data[i]);
        tmp.push('wow');
    };
    return tmp;
  }

  @view({})
  getDataOriginal(){
    return this.messages.toArray();
  }
}