import { Request, Response, NextFunction } from "express";

export const Success = (data: any) => {
    return { data };
};
