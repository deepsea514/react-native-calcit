import { Component } from 'react'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
// used to export topic constants:
export * from './topics.js'
// The Main Subject/Stream to be listened on.
const mainSubject = new Subject()
// This function is used to publish data to the Subject via next().
export const publish = (topic, data) => {
  mainSubject.next({ topic, data })
}
export class Subscriber extends Component {
// Used for unsubscribing when our component unmounts
  unsub = null
  constructor(props) {
    super(props)
    this.state = { topic: props.topic, data: null }
    this.unsub = mainSubject
                 .pipe(filter(f => f.topic === this.state.topic))
                 .subscribe(s => this.setState({ data: s.data }))
  }
  componentWillUnmount() {
    this.unsub.unsubscribe()
  }
  render() {
    return this.props.children(this.state.data)
  }
}