export interface RefreshResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires?: number;
}
