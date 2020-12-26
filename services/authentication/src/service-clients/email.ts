// TODO: Build up the actual email service and use that

class EmailServiceClient {
  send(target: string, type: string, payload?: object) {
    return new Promise<void>(resolve => {
      console.log(target, type, payload)
      resolve()
    })
  }
}

const emailServiceClient = new EmailServiceClient()
export default emailServiceClient
