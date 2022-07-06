const puppeteer = require("puppeteer");

module.exports = {
  async getJntRates(req, res) {
    const width = 1024;
    const height = 1600;
    const initialPage = "https://www.jtexpress.my/shipping-rates";

    const browser = await puppeteer.launch({
      defaultViewport: { width: width, height: height },
    });
    const page = await browser.newPage(browser);

    page.setDefaultNavigationTimeout(90000);

    try {
      await page.setViewport({ width: width, height: height });

      await page.setUserAgent("UA-TEST");

      await page.goto(initialPage);

      await page.type("#sender_postcode", "63000");

      await page.type("#receiver_postcode", "50250");

      await page.type("#weight", "10");

      await page.type("#length", "15");

      await page.type("#width", "12");

      await page.type("#height", "11");

      const button = await page.$("#btn-form-rates-submit");
      await button.evaluate((b) => b.click());

      // let status;
      // let text;
      // if(response.status) {
      //   status = response.status();
      // }
      // if(
      //   status // we actually have an status for the response
      //   && !(status > 299 && status < 400) // not a redirect
      //   && !(status === 204) // not a no-content response
      //   && !(resourceType === 'image') // not an image
      // ) {
      //   text =  await response.text();
      // }

      page.on("response", async (response) => {
        console.log("---------------------");
        console.log("url", response.url());
        console.log("---------------------");
        console.log(response);

        if (response.url() == "https://www.jtexpress.my/shipping-rates") {
          response.buffer().then(
            async (b) => {
              console.log("whole res=>", await response.text());

              console.log(
                `${response.body} ${response.url()} ${b.length} bytes`
              );
            },
            (e) => {
              console.log("whole res=>", response);
              console.error(
                `${response.status()} ${response.url()} failed: ${e}`
              );
            }
          );
        }
      });

      console.log("bout to take screenshot");
      await page.screenshot({ path: "example.png", fullPage: true });

      await browser.close();
      res.send("done");
    } catch (error) {
      console.log("eroorr--->", error);
      res.send(error);
    }
  },
};
