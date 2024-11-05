const responseJson = (statusCode: number, body: { [key: string]: any }) => ({
  statusCode,
  body: JSON.stringify(body)
})

export default responseJson
