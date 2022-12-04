import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt_decode from 'jwt-decode';

import AppService from '../services/app.service';

const existsHeaderAuthorization = (req: Request): boolean => {
  return !!req.headers.authorization;
};

const isFormatRight = (req: Request): boolean => {
  const parts = req.headers.authorization.split(" ");
  return parts?.length !== 2 || parts[0] !== "Bearer" ? false : true;
};

const isAccessTokenValid = async (req: Request): Promise<boolean> => {
  const accessToken = req.headers.authorization.split(" ")[1];

  const request: any = {
    method: "POST",
    url: `${AppService.PATH_AUTH}/auth/validate-access-token`,
    responseType: "json",
    data: { token: accessToken },
  };

  try {
    const result = await axios(request);
    console.log("result.data", result.data);
    return result.data?.valid ? true : false;
  } catch (error) {
    console.log("error", error);
    console.log("devuelve false");
    return false;
  }
};

const setUserId = (req: Request, res: Response) => {
  console.log("setUserId");
  const accessToken = req.headers.authorization.split(" ")[1] as string;
  console.log("accessToken", accessToken);
  try {
    const payload: any = jwt_decode(accessToken);
    console.log("payload", payload);

    res.locals.userId = payload.userId;
  } catch (error) {
    console.log("error setUserId", error);
  }
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!existsHeaderAuthorization(req) || !isFormatRight(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("existe la cabecera");

  if (!isAccessTokenValid(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("el token es válido");

  setUserId(req, res);
  next();
};
