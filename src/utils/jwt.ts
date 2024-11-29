import * as jose from 'jose';

export class JWTService {
  private static readonly MOCK_SECRET = 'your-256-bit-secret';

  static async createToken(payload: any): Promise<string> {
    const secret = new TextEncoder().encode(this.MOCK_SECRET);
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);
  }

  static async verifyToken(token: string): Promise<any> {
    try {
      const secret = new TextEncoder().encode(this.MOCK_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async decodeToken(token: string): Promise<any> {
    try {
      return jose.decodeJwt(token);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
}