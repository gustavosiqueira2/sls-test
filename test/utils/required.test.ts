import HTTP_STATUS_CODE from '@constants/HTTP_STATUS_CODE'

import responseJson from '@utils/responseJson'

import { Required } from '@middleware/required'

interface MockedInterface {
  id: number
  nome: string
}

class MockedController {
  @Required<MockedInterface>(['id', 'nome'])
  public async testFunction(body: MockedInterface) {
    return responseJson(HTTP_STATUS_CODE.OK, body)
  }
}

describe('Required Decorator', () => {
  test('should validate a payload without the name property', async () => {
    const controller = new MockedController()

    const invalidPayload = { id: 1, nome: undefined as unknown as string }

    const response = await controller.testFunction(invalidPayload)

    expect(response.statusCode).toBe(HTTP_STATUS_CODE['Bad Request'])
    expect(response.body).toBe(
      JSON.stringify({ message: 'Missing required field: nome' })
    )
  })
})
