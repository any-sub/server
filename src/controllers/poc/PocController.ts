import { Controller } from "@tsed/di";
import { AcceptMime, Get, Hidden } from "@tsed/schema";
import { Res } from "@tsed/common";
import * as fs from "fs";

@Controller("/poc")
export class PocController {
  @Get("/test.xml")
  @AcceptMime("application/xml")
  public getXml(@Res() res: Res) {
    res.contentType("application/xml; charset=utf-8");
    return fs.readFileSync("V:\\workspace\\any-sub\\tools\\server.xml", "utf-8");
  }

  @Get("/test.html")
  @AcceptMime("text/html")
  public getHtml(@Res() res: Res) {
    res.contentType("text/html; charset=utf-8");
    return fs.readFileSync("V:\\workspace\\any-sub\\tools\\server.html", "utf-8");
  }
}
