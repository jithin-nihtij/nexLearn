export type OtpVerifyRes = {
  success: boolean;
  login: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type CreateProfileRes = {
  success: boolean;
  access_token: string;
  refresh_token: string;
  message: string;
};
