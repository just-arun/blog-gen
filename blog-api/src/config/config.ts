import dotenv from 'dotenv'

export default class Configuration {
  PORT!: number;
  dbURI!: string;
  jwtSecret!: string;
  oneWeek!: number;
  accessCookie!: string;
  refreshCookie!: string;
  corsWhiteList!: string[];
  constructor() {
    this.initFun();
  }
  private initFun() {
    dotenv.config();
    this.PORT = Number(process.env.PORT);
    this.dbURI = String(process.env.DB_URI)
    this.jwtSecret = String(process.env.JWT_SECRET)
    this.oneWeek = Number(process.env.ONE_WEEK)
    this.accessCookie = String(process.env.ACCESS_COOKIE)
    this.refreshCookie = String(process.env.REFRESH_COOKIE)
    this.corsWhiteList = String(process.env.CORS_WHITE_LIST).split(',')
  }
}
