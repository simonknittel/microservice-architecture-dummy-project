// TODO: Build up the actual email service and use that

class EmailClient {
  send(target: string, type: string, payload: object) {
    console.log(target, type, payload)
  }
}

const emailClient = new EmailClient()
export default emailClient
